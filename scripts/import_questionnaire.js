const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

/* 
  Spreadsheet Importer for Mindful Check-in App
  Converts .xls, .xlsx, or .csv questionnaire files into public/dashboard/data/stories.json
*/

const DATA_DIR = path.join(__dirname, '..', 'public', 'dashboard', 'data');
const STORIES_JSON_PATH = path.join(DATA_DIR, 'stories.json');

// Default emotional mix templates for 4 option styles (Analytic, Bold, Social, Cautious)
const DEFAULT_MIX_TEMPLATES = [
  // Option A (Analytic / Reflective)
  {
    valence: 0.15, arousal: 0.16, dominance: 0.35, style: "analytic",
    mix: { veryLow: 0.13, low: 0.69, uneasy: 0.54, neutral: 2.57, good: 2.84, happy: 2.04, veryHappy: 0.94, euphoric: 0.25 }
  },
  // Option B (Bold / Proactive)
  {
    valence: 0.12, arousal: 0.47, dominance: 0.37, style: "bold",
    mix: { veryLow: 0.08, low: 0.41, uneasy: 1.10, neutral: 1.80, good: 1.89, happy: 2.45, veryHappy: 1.63, euphoric: 0.64 }
  },
  // Option C (Social / Expressive)
  {
    valence: 0.36, arousal: 0.08, dominance: 0.11, style: "social",
    mix: { veryLow: 0.07, low: 0.43, uneasy: 0.26, neutral: 2.36, good: 3.29, happy: 2.35, veryHappy: 1.01, euphoric: 0.23 }
  },
  // Option D (Cautious / Protective)
  {
    valence: -0.11, arousal: -0.16, dominance: -0.05, style: "cautious",
    mix: { veryLow: 1.14, low: 2.70, uneasy: 0.63, neutral: 3.61, good: 1.46, happy: 0.38, veryHappy: 0.08, euphoric: 0.01 }
  }
];

function findTargetExcelFile() {
  const customArg = process.argv[2];
  if (customArg && fs.existsSync(customArg)) return customArg;

  // Search in public/dashboard/data/
  const files = fs.readdirSync(DATA_DIR);
  const excelFile = files.find(f => f.endsWith('.xlsx') || f.endsWith('.xls') || f.endsWith('.csv'));
  
  if (excelFile) {
    return path.join(DATA_DIR, excelFile);
  }
  return null;
}

function normalizeKey(str) {
  return String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function runImport() {
  const excelPath = findTargetExcelFile();
  if (!excelPath) {
    console.error('❌ No Excel (.xls / .xlsx) or .csv file found in public/dashboard/data/');
    console.log('Please place your spreadsheet file in: public/dashboard/data/');
    console.log('Or run: node scripts/import_questionnaire.js <path-to-file.xlsx>');
    process.exit(1);
  }

  console.log(`📖 Reading questionnaire spreadsheet: ${excelPath}`);
  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  if (rows.length === 0) {
    console.error('❌ The Excel sheet is empty!');
    process.exit(1);
  }

  console.log(`Found ${rows.length} rows in sheet "${sheetName}". Processing...`);

  // Load existing stories.json structure
  let existingData = { genres: [] };
  if (fs.existsSync(STORIES_JSON_PATH)) {
    try {
      existingData = JSON.parse(fs.readFileSync(STORIES_JSON_PATH, 'utf8'));
    } catch {}
  }

  const genreMap = new Map();
  (existingData.genres || []).forEach(g => {
    genreMap.set(g.id || normalizeKey(g.name), g);
  });

  rows.forEach((row, rowIdx) => {
    // Column header mapping flexibility
    const keys = Object.keys(row);
    const getVal = (...possibleNames) => {
      for (const p of possibleNames) {
        const targetNorm = normalizeKey(p);
        const matchedKey = keys.find(k => normalizeKey(k) === targetNorm);
        if (matchedKey && String(row[matchedKey]).trim()) return String(row[matchedKey]).trim();
      }
      return '';
    };

    const genreName = getVal('Genre', 'Genre Name', 'Category') || 'General Wellness';
    const storyTitle = getVal('Story', 'Story Title', 'Title', 'Topic') || 'Mindful Check-in';
    const beat = getVal('Beat', 'Beat Title', 'Stage') || `Beat ${(rowIdx % 6) + 1}`;
    const scene = getVal('Scene', 'Scenario', 'Description') || `A situation arises in ${storyTitle}.`;
    const questionText = getVal('Question', 'Question Text', 'Prompt') || getVal('Q');

    const optA = getVal('Option A', 'OptionA', 'Option 1', 'Choice A', 'A');
    const optB = getVal('Option B', 'OptionB', 'Option 2', 'Choice B', 'B');
    const optC = getVal('Option C', 'OptionC', 'Option 3', 'Choice C', 'C');
    const optD = getVal('Option D', 'OptionD', 'Option 4', 'Choice D', 'D');

    if (!questionText) return; // Skip empty question rows

    const genreId = normalizeKey(genreName);
    const storyId = normalizeKey(storyTitle);

    let genreObj = genreMap.get(genreId);
    if (!genreObj) {
      genreObj = {
        id: genreId,
        name: genreName,
        icon: "📖",
        stories: []
      };
      genreMap.set(genreId, genreObj);
    }

    let storyObj = genreObj.stories.find(s => s.id === storyId || normalizeKey(s.title) === storyId);
    if (!storyObj) {
      storyObj = {
        id: storyId,
        title: storyTitle,
        questions: []
      };
      genreObj.stories.push(storyObj);
    }

    const rawOptions = [optA, optB, optC, optD].filter(Boolean);
    const options = rawOptions.map((optText, i) => {
      const template = DEFAULT_MIX_TEMPLATES[i % DEFAULT_MIX_TEMPLATES.length];
      return {
        text: optText,
        valence: template.valence,
        arousal: template.arousal,
        dominance: template.dominance,
        mix: { ...template.mix },
        style: template.style
      };
    });

    const questionObj = {
      id: `${genreId.toUpperCase()}_Q${String(storyObj.questions.length + 1).padStart(3, '0')}`,
      beat,
      scene,
      question: questionText,
      options
    };

    storyObj.questions.push(questionObj);
  });

  const updatedGenres = Array.from(genreMap.values());
  const outputData = { genres: updatedGenres };

  fs.writeFileSync(STORIES_JSON_PATH, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`✅ Successfully imported questionnaire to: ${STORIES_JSON_PATH}`);
  console.log(`📊 Summary: ${updatedGenres.length} Genre(s) imported.`);
  updatedGenres.forEach(g => {
    console.log(`  - ${g.name}: ${g.stories.length} Story/Stories`);
    g.stories.forEach(s => {
      console.log(`    • ${s.title}: ${s.questions.length} Question(s)`);
    });
  });
}

runImport();
