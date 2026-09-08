const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const QUESTIONNAIRE_DIR = path.join(__dirname, '..', 'public', 'dashboard', 'data', 'questionnaire');
const OUTPUT_JSON_PATH = path.join(__dirname, '..', 'public', 'dashboard', 'data', 'stories.json');

// Genre metadata mapping (icons and display names)
const GENRE_META = {
  "detective_mystery": { icon: "🔍", name: "Detective & Mystery" },
  "dark_romance": { icon: "🖤", name: "Dark Romance" },
  "competition_challeng": { icon: "🏆", name: "Competition & Challenge" },
  "psychological_thrill": { icon: "🧠", name: "Psychological Thriller" },
  "adventure_exploratio": { icon: "🧭", name: "Adventure & Exploration" },
  "comics_graphic_world": { icon: "⚡", name: "Comics & Graphic Worlds" },
  "drama_real_life": { icon: "🎭", name: "Drama & Real Life" },
  "fantasy_magic": { icon: "✨", name: "Fantasy & Magic" },
  "historical_period_st": { icon: "📜", name: "Historical & Period Stories" },
  "horror_suspense": { icon: "👻", name: "Horror & Suspense" },
  "romance": { icon: "💖", name: "Romance & Relationships" },
  "sci_fi_future": { icon: "🚀", name: "Sci-Fi & Future Worlds" }
};

function parseNumber(val, defaultVal = 0) {
  const num = parseFloat(val);
  return isNaN(num) ? defaultVal : num;
}

function processAllQuestionnaires() {
  console.log(`📁 Scanning XLSX questionnaires directory: ${QUESTIONNAIRE_DIR}`);
  if (!fs.existsSync(QUESTIONNAIRE_DIR)) {
    console.error(`❌ Directory not found: ${QUESTIONNAIRE_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(QUESTIONNAIRE_DIR).filter(f => f.endsWith('.xlsx') || f.endsWith('.xls'));
  console.log(`Found ${files.length} questionnaire spreadsheet files to import.`);

  const genresList = [];

  files.forEach((fileName, fIdx) => {
    const filePath = path.join(QUESTIONNAIRE_DIR, fileName);
    console.log(`\n[${fIdx + 1}/${files.length}] Importing: ${fileName}...`);

    const wb = XLSX.readFile(filePath);
    let genreName = "";
    let genreId = fileName.replace(/(_psychology_scored|_unique_final|_story_specific)+/gi, '').replace(/\.(xlsx|xls)$/i, '').toLowerCase();

    const meta = GENRE_META[genreId] || { icon: "📖", name: genreId.replace(/_/g, ' ') };
    const storiesList = [];

    wb.SheetNames.forEach(sheetName => {
      if (sheetName.toUpperCase() === 'INDEX' || sheetName.toUpperCase() === 'SCORING_METHOD') return;

      const sheet = wb.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      if (rows.length === 0) return;

      const firstRow = rows[0];
      if (!genreName && firstRow['Genre']) {
        genreName = firstRow['Genre'];
      }

      const storyTitle = firstRow['Story'] || sheetName.replace(/^\d+_/, '').trim();
      const storyId = sheetName.toLowerCase().replace(/[^a-z0-9_]/g, '_');

      const questionsList = [];

      rows.forEach((row, rIdx) => {
        const qId = row['Question ID'] || `${genreId.toUpperCase()}_Q${String(rIdx + 1).padStart(3, '0')}`;
        const beat = row['Story Beat'] ? `Beat ${row['Story Beat']}` : `Beat ${Math.floor(rIdx / 6) + 1}`;
        const scene = row['Scene Purpose'] || `Scenario in ${storyTitle}`;
        const questionText = row['Question'];

        if (!questionText) return;

        const letters = ['A', 'B', 'C', 'D'];
        const options = [];

        letters.forEach((letter) => {
          const rawOptText = row[`Option ${letter}`];
          if (!rawOptText) return;

          const valence = parseNumber(row[`Valence ${letter}`]);
          const arousal = parseNumber(row[`Arousal ${letter}`]);
          const dominance = parseNumber(row[`Dominance ${letter}`]);

          const mix = {
            veryLow: parseNumber(row[`Very Low ${letter}`]),
            low: parseNumber(row[`Low ${letter}`]),
            uneasy: parseNumber(row[`Uneasy ${letter}`]),
            neutral: parseNumber(row[`Neutral ${letter}`]),
            good: parseNumber(row[`Good ${letter}`]),
            happy: parseNumber(row[`Happy ${letter}`]),
            veryHappy: parseNumber(row[`Very Happy ${letter}`]),
            euphoric: parseNumber(row[`Euphoric ${letter}`])
          };

          // Store EXACT raw option text directly from the XLSX spreadsheet
          options.push({
            text: String(rawOptText).trim(),
            valence,
            arousal,
            dominance,
            mix
          });
        });

        questionsList.push({
          id: qId,
          beat: String(beat).startsWith('Beat') ? String(beat) : `Beat ${beat}`,
          scene,
          question: questionText,
          options
        });
      });

      if (questionsList.length > 0) {
        storiesList.push({
          id: storyId,
          title: storyTitle,
          questions: questionsList
        });
      }
    });

    if (storiesList.length > 0) {
      genresList.push({
        id: genreId,
        name: genreName || meta.name,
        icon: meta.icon,
        stories: storiesList
      });
    }
  });

  const outputData = { genres: genresList };
  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(outputData), 'utf8');

  // Also write modular genre files under public/dashboard/data/genres/
  const GENRES_DIR = path.join(__dirname, '..', 'public', 'dashboard', 'data', 'genres');
  if (!fs.existsSync(GENRES_DIR)) {
    fs.mkdirSync(GENRES_DIR, { recursive: true });
  }

  // Write lightweight index file (genres.json) containing genre list & story metadata without heavy question arrays
  const genresIndex = {
    genres: genresList.map(g => ({
      id: g.id,
      name: g.name,
      icon: g.icon,
      stories: g.stories.map(s => ({
        id: s.id,
        title: s.title,
        questionCount: s.questions.length
      }))
    }))
  };

  const INDEX_PATH = path.join(__dirname, '..', 'public', 'dashboard', 'data', 'genres.json');
  fs.writeFileSync(INDEX_PATH, JSON.stringify(genresIndex), 'utf8');
  console.log(`Saved lightweight index to: ${INDEX_PATH}`);

  // Write individual genre JSON files
  genresList.forEach(g => {
    const genreFilePath = path.join(GENRES_DIR, `${g.id}.json`);
    fs.writeFileSync(genreFilePath, JSON.stringify(g), 'utf8');
    const sizeMb = (fs.statSync(genreFilePath).size / (1024 * 1024)).toFixed(2);
    console.log(`  └ Saved genre [${g.id}]: ${genreFilePath} (${sizeMb} MB)`);
  });

  console.log(`\n🎉 RAW XLSX QUESTIONNAIRE modular IMPORT COMPLETE!`);
  console.log(`Summary:`);
  let totalStories = 0;
  let totalQuestions = 0;
  genresList.forEach(g => {
    totalStories += g.stories.length;
    const qCount = g.stories.reduce((acc, s) => acc + s.questions.length, 0);
    totalQuestions += qCount;
    console.log(`  • ${g.icon} ${g.name}: ${g.stories.length} stories, ${qCount} questions`);
  });
  console.log(`\nTOTALS: ${genresList.length} Genres | ${totalStories} Stories | ${totalQuestions} Questions`);
}

processAllQuestionnaires();
