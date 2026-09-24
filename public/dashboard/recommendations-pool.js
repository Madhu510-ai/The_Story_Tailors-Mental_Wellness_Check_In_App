/* ==========================================================================
   ENORMOUS INTRICATE RECOMMENDATIONS POOL
   Evidence-informed behavioral, somatic, cognitive, and circadian interventions.
   Tailored across 8 mood spectrum tiers, 3 sleep wellness ranges, and multi-metric synergies.
   ========================================================================== */

window.RECOMMENDATIONS_POOL = [
  /* ------------------------------------------------------------------------
     1. VERY LOW MOOD (0 - 20%) · Focus: Gentle Grounding, Safety & Low Demands
     ------------------------------------------------------------------------ */
  {
    id: "rec_vl_somatic_54321",
    title: "5-4-3-2-1 Sensory Grounding",
    category: "Somatic & Nervous Reset",
    categoryKey: "somatic",
    icon: "🌿",
    targetMoods: ["veryLow", "low"],
    minMood: 0,
    maxMood: 25,
    minSleep: 0,
    maxSleep: 60,
    duration: "4 min",
    durationSeconds: 240,
    intensity: "Gentle",
    tags: ["Overwhelm", "Sensory", "Immediate Relief"],
    summary: "Quiet hyper-arousal and return to physical stability using sensory touchstones.",
    scienceWhy: "Engages the prefrontal cortex and dampens amygdala distress signals by sequentially cycling through five sensory modalities.",
    matchBadge: "Deep Overwhelm Relief",
    instructions: [
      "Acknowledge 5 things you can visually see right now — focus on their specific colors or textures.",
      "Gently touch 4 distinct surfaces around you (e.g., fabric of clothing, cool desk surface, phone edge).",
      "Listen closely for 3 distinct ambient sounds (fan hum, distant traffic, your own steady breath).",
      "Notice 2 things you can smell, or take a deep neutral breath through your nose.",
      "Notice 1 physical sensation of support, like the ground under your feet or the back of your chair."
    ]
  },
  {
    id: "rec_vl_compassion_break",
    title: "Self-Compassion Pause",
    category: "Mind & Emotional Care",
    categoryKey: "mindful",
    icon: "🕊️",
    targetMoods: ["veryLow", "low"],
    minMood: 0,
    maxMood: 25,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Gentle",
    tags: ["Compassion", "Emotional Warmth", "Self-Care"],
    summary: "Replace harsh self-criticism with comforting, scientifically-backed self-validation.",
    scienceWhy: "Based on Dr. Kristin Neff's self-compassion framework, releasing oxytocin and soothing the threat defense system.",
    matchBadge: "Emotional Cushioning",
    instructions: [
      "Place one or both hands gently over your heart or on your upper arms for warm tactile contact.",
      "Whisper or silently acknowledge: 'This is a moment of deep difficulty. Difficulty is a normal part of being human.'",
      "Take 3 slow breaths, feeling the gentle rise and fall beneath your palms.",
      "Speak internally to yourself as you would to a dear, exhausted friend: 'May I be kind to myself right now.'",
      "Release all expectations of productivity for the next hour."
    ]
  },
  {
    id: "rec_vl_thermal_soothe",
    title: "Vagal Thermal Comfort Reset",
    category: "Somatic & Nervous Reset",
    categoryKey: "somatic",
    icon: "🍵",
    targetMoods: ["veryLow"],
    minMood: 0,
    maxMood: 22,
    minSleep: 0,
    maxSleep: 60,
    duration: "6 min",
    durationSeconds: 360,
    intensity: "Gentle",
    tags: ["Thermal", "Vagus Nerve", "Physical Comfort"],
    summary: "Use warm temperature and tactile containment to signal biological safety to the brainstem.",
    scienceWhy: "Thermal tactile stimulation stimulates cutaneous C-tactile afferents, activating parasympathetic tone and down-regulating cortisol.",
    matchBadge: "Biological Safety Cue",
    instructions: [
      "Prepare a warm cup of herbal tea, warm water, or hold a warm mug or heat pad between both palms.",
      "Wrap a comfortable blanket or soft layer snugly around your shoulders.",
      "Take small, deliberate sips, tracking the temperature as it moves down your chest.",
      "Unclench your jaw and let your tongue rest loosely on the floor of your mouth.",
      "Rest quietly without checking notifications or news."
    ]
  },
  {
    id: "rec_vl_box_breath_sooth",
    title: "Box Breathing 3-3-3",
    category: "Somatic & Nervous Reset",
    categoryKey: "somatic",
    icon: "🫁",
    targetMoods: ["veryLow", "uneasy"],
    minMood: 0,
    maxMood: 30,
    minSleep: 0,
    maxSleep: 60,
    duration: "3 min",
    durationSeconds: 180,
    intensity: "Gentle",
    tags: ["Breathing", "Autonomic Balance", "Quick"],
    summary: "A gentle square-wave breathing cadence designed for low-capacity moments.",
    scienceWhy: "Even pacing of respiratory phases restores heart rate variability (HRV) and stabilizes autonomic nervous output.",
    matchBadge: "Gentle Autonomic Reset",
    instructions: [
      "Gently empty your lungs with a soft, audible exhale through parted lips.",
      "Inhale through your nose slowly for 3 counts.",
      "Hold your breath gently without straining for 3 counts.",
      "Exhale softly through your nose or mouth for 3 counts.",
      "Pause in stillness for 3 counts before repeating for 6 cycles."
    ]
  },
  {
    id: "rec_vl_zero_demand",
    title: "Zero-Demand Micro Sanctuary",
    category: "Mind & Emotional Care",
    categoryKey: "mindful",
    icon: "🕯️",
    targetMoods: ["veryLow"],
    minMood: 0,
    maxMood: 20,
    minSleep: 0,
    maxSleep: 60,
    duration: "8 min",
    durationSeconds: 480,
    intensity: "Gentle",
    tags: ["Sanctuary", "Zero Pressure", "Decompression"],
    summary: "Grant yourself total permission to accomplish nothing for eight guilt-free minutes.",
    scienceWhy: "Alleviates executive function burnout and decision fatigue by removing cognitive load completely.",
    matchBadge: "Crisis Demands Off",
    instructions: [
      "Turn off or mute all device screens and notifications.",
      "Dim harsh overhead lights or draw the blinds to reduce sensory stimulation.",
      "Lie down on your back or lean into a supported chair with pillows.",
      "Close your eyes and declare internally: 'For 8 minutes, I have zero responsibilities.'",
      "Let thoughts drift like clouds without engaging or fixing any problems."
    ]
  },
  {
    id: "rec_vl_ambient_ground",
    title: "Low-Frequency Audio Immersion",
    category: "Mind & Emotional Care",
    categoryKey: "mindful",
    icon: "🎧",
    targetMoods: ["veryLow", "low"],
    minMood: 0,
    maxMood: 25,
    minSleep: 0,
    maxSleep: 60,
    duration: "7 min",
    durationSeconds: 420,
    intensity: "Gentle",
    tags: ["Audio", "Sound Therapy", "Calm"],
    summary: "Listen to steady ambient rain, brown noise, or deep ocean surf to quiet racing rumination.",
    scienceWhy: "Brownian acoustic noise masks startling auditory peaks, driving alpha and theta brainwave coherence.",
    matchBadge: "Acoustic Decompression",
    instructions: [
      "Put on comfortable headphones or set low-volume speaker audio.",
      "Select brown noise, gentle rain, or deep ocean tide frequencies.",
      "Rest your head back and let the continuous frequency wash over you.",
      "With every breath, imagine sinking 5% heavier into your chair or cushion.",
      "Remain in this acoustic cocoon until the timer sounds."
    ]
  },

  /* ------------------------------------------------------------------------
     2. LOW MOOD (21 - 35%) · Focus: Cathartic Release & Micro-Activation
     ------------------------------------------------------------------------ */
  {
    id: "rec_l_brain_dump",
    title: "Cathartic Brain-Dump Journal",
    category: "Journal & Reflection",
    categoryKey: "journal",
    icon: "✍️",
    targetMoods: ["low"],
    minMood: 21,
    maxMood: 36,
    minSleep: 0,
    maxSleep: 60,
    duration: "7 min",
    durationSeconds: 420,
    intensity: "Gentle",
    tags: ["Journaling", "Release", "Clarity"],
    summary: "Transfer heavy, unorganized thoughts onto paper without editing, grammar, or judgment.",
    scienceWhy: "Expressive writing externalizes mental burdens, reducing working-memory load and cognitive rumination.",
    matchBadge: "Unburden Heavy Thoughts",
    instructions: [
      "Grab a blank sheet of paper or open a raw notes document.",
      "Write everything that feels heavy, frustrating, or draining right now without stopping.",
      "Do not censor, edit, or worry about neatness — allow messy thoughts.",
      "After 5 minutes of writing, draw a thick circle around the whole page.",
      "Write one single sentence at the bottom: 'These are thoughts, not facts, and they do not define today.'"
    ]
  },
  {
    id: "rec_l_micro_step_activation",
    title: "The 2-Minute 'One Tiny Task'",
    category: "Active Momentum",
    categoryKey: "action",
    icon: "🌱",
    targetMoods: ["low"],
    minMood: 21,
    maxMood: 35,
    minSleep: 0,
    maxSleep: 60,
    duration: "3 min",
    durationSeconds: 180,
    intensity: "Gentle",
    tags: ["Behavioral Activation", "Micro-Win", "Energy"],
    summary: "Break depressive inertia with one ultra-small, frictionless physical achievement.",
    scienceWhy: "Behavioral activation theory demonstrates that taking tiny actions precedes motivation, triggering a dopamine spark.",
    matchBadge: "Break Inertia",
    instructions: [
      "Pick ONE microscopic task: clear one mug, make half the bed, wash your face, or throw away one receipt.",
      "Ignore everything else in the room — give this single micro-action your complete presence.",
      "Complete the task slowly and deliberately.",
      "Stand tall, breathe in deeply, and register the completion: 'Done.'",
      "Acknowledge yourself for taking action even while feeling low."
    ]
  },
  {
    id: "rec_l_gentle_sky_stroll",
    title: "Micro Outdoor Horizon Scan",
    category: "Active Momentum",
    categoryKey: "action",
    icon: "⛅",
    targetMoods: ["low", "neutral"],
    minMood: 22,
    maxMood: 50,
    minSleep: 0,
    maxSleep: 60,
    duration: "6 min",
    durationSeconds: 360,
    intensity: "Gentle",
    tags: ["Nature", "Movement", "Perspective"],
    summary: "Step outside or to an open window and expand your visual field to the distant horizon.",
    scienceWhy: "Panoramic optic flow suppresses the brain's internal threat surveillance circuit and lifts depressive cognitive tunnel-vision.",
    matchBadge: "Panoramic Perspective Shift",
    instructions: [
      "Step outside onto a porch, balcony, sidewalk, or stand directly facing an open window.",
      "Look as far into the distance as possible — at tree tops, clouds, or distant rooftops.",
      "Allow your peripheral vision to widen so you perceive the sides of your surroundings simultaneously.",
      "Walk 50 paces or take 10 deep breaths while maintaining wide panoramic focus.",
      "Notice the natural light touching your face before heading back inside."
    ]
  },
  {
    id: "rec_l_soothing_stretches",
    title: "Somatic Shoulder & Neck Release",
    category: "Somatic & Nervous Reset",
    categoryKey: "somatic",
    icon: "🧘",
    targetMoods: ["low", "uneasy"],
    minMood: 20,
    maxMood: 45,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Gentle",
    tags: ["Stretching", "Somatic", "Release"],
    summary: "Release the physical protective posture (hunching, guarded shoulders) associated with low mood.",
    scienceWhy: "Proprioceptive biofeedback from opened chest and neck musculature sends affirming feedback to the limbic system.",
    matchBadge: "Physical Posture Unlock",
    instructions: [
      "Roll your shoulders slowly backwards in wide circles 5 times, inhaling as they rise.",
      "Gently tilt your right ear toward your right shoulder; hold for 3 slow breaths.",
      "Switch and gently tilt your left ear toward your left shoulder for 3 breaths.",
      "Interlace your fingers behind your back or place palms on your lower back and open your chest to the ceiling.",
      "Let out a long sigh as you release back to neutral."
    ]
  },
  {
    id: "rec_l_nostalgia_anchor",
    title: "Comfort Memory Sanctuary",
    category: "Mind & Emotional Care",
    categoryKey: "mindful",
    icon: "📸",
    targetMoods: ["low"],
    minMood: 21,
    maxMood: 36,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Gentle",
    tags: ["Memory", "Warmth", "Perspective"],
    summary: "Revisit a photographic or sensory memory of deep contentment, belonging, or safety.",
    scienceWhy: "Positive autobiographical memory recall stimulates serotonin and reminds the hippocampus that hardship is episodic.",
    matchBadge: "Belonging Memory Recall",
    instructions: [
      "Open your phone photos or close your eyes to recall a specific time you felt safe, warm, or amused.",
      "Remember the colors, smells, weather, and people who were present.",
      "Relive the physical sensation of ease in your body during that moment.",
      "Remind yourself: 'That version of me is still in me. This heavy phase will pass.'",
      "Save that photo to your favorites as a quick lifeline for today."
    ]
  },
  {
    id: "rec_l_kind_text",
    title: "Micro-Connection Ping",
    category: "Social & Connection",
    categoryKey: "social",
    icon: "💬",
    targetMoods: ["low", "uneasy"],
    minMood: 21,
    maxMood: 40,
    minSleep: 0,
    maxSleep: 60,
    duration: "3 min",
    durationSeconds: 180,
    intensity: "Gentle",
    tags: ["Connection", "Support", "Low Effort"],
    summary: "Send a low-pressure, one-sentence message to someone you trust without expecting an essay.",
    scienceWhy: "Social buffering buffers the neuroendocrine stress response even through brief digital touchpoints.",
    matchBadge: "Low-Pressure Bridge",
    instructions: [
      "Think of one supportive friend, relative, or partner.",
      "Send a simple low-demand message, e.g.: 'Thinking of you today, hope your week is treating you well!'",
      "Or if you need quiet presence: 'Feeling a bit low on battery today, just sending some warmth your way.'",
      "Put your phone face down — do not wait or fret over the reply time.",
      "Feel the quiet pride of opening a door of connection even when feeling withdrawn."
    ]
  },

  /* ------------------------------------------------------------------------
     3. UNEASY MOOD (36 - 48%) · Focus: De-escalation, Vagal Reset & Worry Sorting
     ------------------------------------------------------------------------ */
  {
    id: "rec_u_physiological_sigh",
    title: "Physiological Sigh Protocol",
    category: "Somatic & Nervous Reset",
    categoryKey: "somatic",
    icon: "🌬️",
    targetMoods: ["uneasy", "veryLow"],
    minMood: 30,
    maxMood: 50,
    minSleep: 0,
    maxSleep: 60,
    duration: "3 min",
    durationSeconds: 180,
    intensity: "Gentle",
    tags: ["Anxiety", "Huberman Lab", "Instant Calm"],
    summary: "The fastest scientifically proven autonomic off-ramp for sudden spikes in anxiety and mental tension.",
    scienceWhy: "Double inhale re-inflates collapsed pulmonary alveoli; prolonged exhale triggers the vagal brake, rapidly lowering heart rate.",
    matchBadge: "Fast Anxiety Off-Ramp",
    instructions: [
      "Inhale deeply through your nose until your lungs are about 80% full.",
      "Without exhaling, take a second quick sharp 'top-off' sniff through your nose to maximally expand your lungs.",
      "Open your mouth and release a long, slow, passive sigh until completely empty.",
      "Repeat this exact two-inhale, one-exhale pattern 5 to 7 times.",
      "Observe the tangible drop in muscle tension across your jaw and stomach."
    ]
  },
  {
    id: "rec_u_progressive_muscle",
    title: "Progressive Muscle Release (PMR)",
    category: "Somatic & Nervous Reset",
    categoryKey: "somatic",
    icon: "⚡",
    targetMoods: ["uneasy"],
    minMood: 35,
    maxMood: 50,
    minSleep: 0,
    maxSleep: 60,
    duration: "6 min",
    durationSeconds: 360,
    intensity: "Moderate",
    tags: ["PMR", "Tension", "Somatic"],
    summary: "Systematically tense and release muscle groups to discharge somatic apprehension.",
    scienceWhy: "Jacobson's PMR technique produces profound physical contrast, teaching motor neurons to release baseline isometric clenching.",
    matchBadge: "Somatic Contrast Release",
    instructions: [
      "Clench your hands into tight fists for 5 seconds — feel the tension — then release completely.",
      "Squeeze your shoulders up toward your ears as tightly as you can for 5 seconds — drop them down with a sigh.",
      "Tightly squeeze your eyes shut and furrow your brow for 5 seconds — smooth your face completely.",
      "Flex your abdomen and calves for 5 seconds — let them turn completely limp.",
      "Spend 60 seconds enjoying the heavy, warm sensation of released muscle fibers."
    ]
  },
  {
    id: "rec_u_control_spheres",
    title: "Circles of Control Sorter",
    category: "Journal & Reflection",
    categoryKey: "journal",
    icon: "🎯",
    targetMoods: ["uneasy"],
    minMood: 35,
    maxMood: 49,
    minSleep: 0,
    maxSleep: 60,
    duration: "6 min",
    durationSeconds: 360,
    intensity: "Moderate",
    tags: ["Overthinking", "Cognitive Reframing", "Focus"],
    summary: "Disentangle the storm of uncontrollable scenarios from the 2 actions you can actually control right now.",
    scienceWhy: "Cognitive boundary delineation stops catastrophic forecasting in the anterior cingulate cortex.",
    matchBadge: "Overthinking Tamer",
    instructions: [
      "Draw two concentric circles on paper: an Inner Circle (My Control) and an Outer Circle (Out of My Control).",
      "In the Outer Circle, write the outcomes, other people's opinions, or future unknowns worrying you.",
      "Explicitly write: 'I surrender trying to manage these today.'",
      "In the Inner Circle, write exactly 2 microscopic actions you can physically do in the next 30 minutes.",
      "Focus 100% of your remaining energy exclusively on those 2 inner actions."
    ]
  },
  {
    id: "rec_u_478_parasympathetic",
    title: "4-7-8 Parasympathetic Regulator",
    category: "Somatic & Nervous Reset",
    categoryKey: "somatic",
    icon: "🌊",
    targetMoods: ["uneasy", "low"],
    minMood: 32,
    maxMood: 48,
    minSleep: 0,
    maxSleep: 60,
    duration: "4 min",
    durationSeconds: 240,
    intensity: "Gentle",
    tags: ["Dr. Weil", "Vagus Nerve", "Heart Rate"],
    summary: "A potent rhythmic breathing method that slows hyperactive thoughts and resets pulse rate.",
    scienceWhy: "Dr. Andrew Weil's 4-7-8 rhythm increases arterial baroreceptor sensitivity, enforcing parasympathetic dominance.",
    matchBadge: "Pulse & Thought Braking",
    instructions: [
      "Place the tip of your tongue against the ridge of tissue behind your upper front teeth.",
      "Inhale quietly through your nose to a mental count of 4.",
      "Hold your breath gently for a count of 7.",
      "Exhale audibly through your mouth with a 'whoosh' sound for a full count of 8.",
      "Repeat for 4 full breath cycles without rushing."
    ]
  },
  {
    id: "rec_u_grounding_touchstone",
    title: "Tactile Anchor Focus",
    category: "Mind & Emotional Care",
    categoryKey: "mindful",
    icon: "🪙",
    targetMoods: ["uneasy"],
    minMood: 36,
    maxMood: 50,
    minSleep: 0,
    maxSleep: 60,
    duration: "3 min",
    durationSeconds: 180,
    intensity: "Gentle",
    tags: ["Grounding", "Focus", "Anxiety"],
    summary: "Use a smooth stone, ring, or physical object to anchor drifting anxiety into the immediate present.",
    scienceWhy: "Tactile sensory gating interrupts the repetitive feedback loop of cognitive rumination.",
    matchBadge: "Immediate Tactile Reality",
    instructions: [
      "Find a small solid object: a smooth stone, a coin, a watch, a pencil, or keys.",
      "Hold it in your non-dominant hand and explore its weight, temperature, and edges with your thumb.",
      "Describe its physical properties aloud or internally with clinical curiosity (e.g. 'cold, metallic, etched edges').",
      "Whenever anxious 'what-if' thoughts pop up, gently press the object into your palm and return to its texture.",
      "Carry this object in your pocket as an anchor for the rest of the day."
    ]
  },
  {
    id: "rec_u_shakeout_tension",
    title: "90-Second Somatic Tremor Shakeout",
    category: "Active Momentum",
    categoryKey: "action",
    icon: "🐾",
    targetMoods: ["uneasy"],
    minMood: 35,
    maxMood: 48,
    minSleep: 0,
    maxSleep: 60,
    duration: "2 min",
    durationSeconds: 120,
    intensity: "Moderate",
    tags: ["Neurogenic Shaking", "Somatic", "Release"],
    summary: "Discharge adrenaline buildup by shaking your hands, arms, and legs just like animals do after a scare.",
    scienceWhy: "Inspired by Somatic Experiencing (Dr. Peter Levine); muscular shaking signals the completion of the freeze/fight response.",
    matchBadge: "Discharge Trapped Adrenaline",
    instructions: [
      "Stand up with soft, unlocked knees and relax your shoulders.",
      "Shake your hands from the wrists as if flicking water off your fingertips for 30 seconds.",
      "Let the shaking travel up into your forearms, elbows, and shoulders.",
      "Bounce gently on the balls of your feet, letting your chest and jaw vibrate freely.",
      "Come to a sudden stop, close your eyes, and feel the warm tingling sensation spreading through your limbs."
    ]
  },

  /* ------------------------------------------------------------------------
     4. NEUTRAL MOOD (49 - 62%) · Focus: Alignment, Spinal Wave & Mindful Micro-Pivots
     ------------------------------------------------------------------------ */
  {
    id: "rec_n_spinal_wave",
    title: "Postural & Spinal Wave Reset",
    category: "Active Momentum",
    categoryKey: "action",
    icon: "🧘‍♂️",
    targetMoods: ["neutral"],
    minMood: 49,
    maxMood: 63,
    minSleep: 0,
    maxSleep: 60,
    duration: "4 min",
    durationSeconds: 240,
    intensity: "Moderate",
    tags: ["Posture", "Spine", "Desk Break"],
    summary: "Re-align compressed vertebrae and re-oxygenate posture after hours of flat screen focus.",
    scienceWhy: "Spinal mobility stimulates cerebrospinal fluid circulation and sends alertness signals through the ascending reticular activating system.",
    matchBadge: "Posture Awakening",
    instructions: [
      "Stand tall with feet hip-width apart and reach both arms toward the ceiling on an inhale.",
      "Interlace your fingers, invert palms upward, and stretch your spine as long as possible.",
      "Perform gentle side bends to the right and left, feeling the ribcage open.",
      "Slowly fold forward at the hips, letting your head and arms hang heavy like a ragdoll for 3 deep breaths.",
      "Roll up vertebra by vertebra, roll your shoulders back, and notice the increased headroom."
    ]
  },
  {
    id: "rec_n_micro_gratitude",
    title: "3 Unsung Conveniences Scan",
    category: "Journal & Reflection",
    categoryKey: "journal",
    icon: "🔍",
    targetMoods: ["neutral"],
    minMood: 48,
    maxMood: 63,
    minSleep: 0,
    maxSleep: 60,
    duration: "4 min",
    durationSeconds: 240,
    intensity: "Gentle",
    tags: ["Gratitude", "Perspective", "Nuance"],
    summary: "Shift from emotional autopilot by spotting 3 quiet, overlooked wonders in your immediate space.",
    scienceWhy: "Cognitive reframing against hedonic adaptation stimulates dopamine pathways for mundane environments.",
    matchBadge: "Break Autopilot",
    instructions: [
      "Look around your room or desk and identify 3 tools or comforts you take completely for granted.",
      "Examples: running clean water from the tap, comfortable chair cushioning, instant access to music.",
      "Spend 30 seconds mentally appreciating the ingenuity and hands that made each item possible.",
      "Take one deep breath acknowledging: 'Even on unremarkable days, my life is supported by countless unseen gifts.'",
      "Smile gently at how grounding small conveniences are."
    ]
  },
  {
    id: "rec_n_mindful_hydration",
    title: "Mindful Hydration Savoring",
    category: "Somatic & Nervous Reset",
    categoryKey: "somatic",
    icon: "💧",
    targetMoods: ["neutral", "low"],
    minMood: 45,
    maxMood: 64,
    minSleep: 0,
    maxSleep: 60,
    duration: "3 min",
    durationSeconds: 180,
    intensity: "Gentle",
    tags: ["Hydration", "Sensory", "Focus"],
    summary: "Turn drinking a glass of water into a rich sensory mindfulness anchor.",
    scienceWhy: "Mild dehydration (as low as 1-2%) directly impairs mood stability, vigilance, and working memory.",
    matchBadge: "Biological Energy Replenishment",
    instructions: [
      "Pour a fresh glass of cool or room-temperature water.",
      "Hold the glass with both hands and observe condensation or light reflections through the liquid.",
      "Take a deliberate sip, feeling the coolness on your lips and tongue before swallowing.",
      "Follow the sensation of hydration moving down into your body.",
      "Drink the entire glass at an unhurried, mindful pace."
    ]
  },
  {
    id: "rec_n_values_compass",
    title: "Daily Value Compass Alignment",
    category: "Mind & Emotional Care",
    categoryKey: "mindful",
    icon: "🧭",
    targetMoods: ["neutral"],
    minMood: 49,
    maxMood: 62,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Moderate",
    tags: ["Values", "Intentionality", "Purpose"],
    summary: "Pick one core value to steer your afternoon decisions instead of running on sheer inertia.",
    scienceWhy: "Values-affirmation interventions reduce biological defensiveness and enhance goal persistence (Steele et al.).",
    matchBadge: "Purpose Re-calibration",
    instructions: [
      "Read these 5 values: Curiosity · Patience · Courage · Craftsmanship · Compassion.",
      "Select the single value that feels most relevant to the challenges awaiting you today.",
      "Ask yourself: 'How would my afternoon look if I led with this one value?'",
      "Write that value on a sticky note or top of your notepad.",
      "Commit to applying it in your very next interaction or task."
    ]
  },
  {
    id: "rec_n_fresh_air_lap",
    title: "5-Minute Air & Light Lap",
    category: "Active Momentum",
    categoryKey: "action",
    icon: "🚶‍♂️",
    targetMoods: ["neutral", "uneasy"],
    minMood: 48,
    maxMood: 62,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Moderate",
    tags: ["Walk", "Light", "Circadian"],
    summary: "A brisk lap around the block or building to reboot blood flow and break mental stagnation.",
    scienceWhy: "Bipedal locomotion stimulates rhythmic bilateral ocular scanning, reducing stress while elevating wakefulness.",
    matchBadge: "Mental Fog Dissolver",
    instructions: [
      "Put your shoes on and walk out the front door without listening to audio or checking messages.",
      "Walk briskly for 2.5 minutes in one direction.",
      "Notice 3 things in nature: tree leaves moving, cloud formations, birds.",
      "Turn around and walk 2.5 minutes back with relaxed, rhythmic arm swings.",
      "Return with refreshed focus and renewed physical vigor."
    ]
  },
  {
    id: "rec_n_workspace_declutter",
    title: "3-Minute Desk Sanctuary Polish",
    category: "Active Momentum",
    categoryKey: "action",
    icon: "✨",
    targetMoods: ["neutral"],
    minMood: 49,
    maxMood: 62,
    minSleep: 0,
    maxSleep: 60,
    duration: "3 min",
    durationSeconds: 180,
    intensity: "Gentle",
    tags: ["Organization", "Clarity", "Calm"],
    summary: "Clear visual clutter to instantly free up subconscious cognitive bandwidth.",
    scienceWhy: "Visual clutter competes for neural representation in the visual cortex, subtly elevating baseline stress.",
    matchBadge: "Visual Field Clarity",
    instructions: [
      "Remove empty cups, plates, unnecessary wrappers, or stray papers from your primary workspace.",
      "Align keyboard, notebook, and mouse in a harmonious, uncluttered layout.",
      "Wipe down your desktop surface with a cloth or damp towel.",
      "Take one deep breath standing back to appreciate your cleared personal cockpit.",
      "Sit back down with a clean slate."
    ]
  },

  /* ------------------------------------------------------------------------
     5. GOOD MOOD (63 - 75%) · Focus: Savoring, Broaden-and-Build & Creative Flow
     ------------------------------------------------------------------------ */
  {
    id: "rec_g_savoring_peak",
    title: "Broaden-and-Build Savoring",
    category: "Journal & Reflection",
    categoryKey: "journal",
    icon: "🌟",
    targetMoods: ["good"],
    minMood: 63,
    maxMood: 76,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Gentle",
    tags: ["Savoring", "Fredrickson", "Resilience"],
    summary: "Anchor your positive mental state so it compounds into lasting psychological capital.",
    scienceWhy: "Barbara Fredrickson's Broaden-and-Build model reveals that actively savoring positive emotion expands cognitive flexibility.",
    matchBadge: "Anchor Positive Resonance",
    instructions: [
      "Recall the brightest part of your day or morning so far.",
      "Identify the specific emotion it created: pride, peace, affection, humor, or clarity.",
      "Close your eyes and breathe into that feeling for 60 seconds, visualizing it soaking into every cell.",
      "Note what conditions or personal actions made that positive moment happen.",
      "Commit to carrying that steady, grounded warmth into your next conversation."
    ]
  },
  {
    id: "rec_g_creative_sprint",
    title: "15-Minute Unlocked Flow Sprint",
    category: "Creative & Expressive",
    categoryKey: "creative",
    icon: "🎨",
    targetMoods: ["good", "happy"],
    minMood: 63,
    maxMood: 82,
    minSleep: 30,
    maxSleep: 60,
    duration: "15 min",
    durationSeconds: 900,
    intensity: "Moderate",
    tags: ["Creativity", "Flow", "Productivity"],
    summary: "Channel your positive, clear mental balance into a creative or intellectually challenging milestone.",
    scienceWhy: "Optimal dopamine-acetylcholine balance in 'Good' mood states minimizes self-doubt and maximizes associative thinking.",
    matchBadge: "Prime Flow-State Window",
    instructions: [
      "Pick a creative problem, essay, design, or project component that has felt blocked.",
      "Set your phone across the room in Do Not Disturb mode.",
      "Set a dedicated 15-minute timer.",
      "Work in pure output mode — generating ideas, sketches, or paragraphs without self-editing.",
      "Review your progress at the chime with genuine appreciation."
    ]
  },
  {
    id: "rec_g_gratitude_letter",
    title: "Gratitude Voice Note / Mini Letter",
    category: "Social & Connection",
    categoryKey: "social",
    icon: "💌",
    targetMoods: ["good", "happy"],
    minMood: 63,
    maxMood: 80,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Gentle",
    tags: ["Gratitude", "Connection", "Social"],
    summary: "Send an unexpected, heartfelt note of specific appreciation to someone who helped shape you.",
    scienceWhy: "Expressing social gratitude enhances relationship bonding and boosts reciprocal dopamine/oxytocin in both sender and recipient.",
    matchBadge: "Multiply Good Energy",
    instructions: [
      "Think of a friend, colleague, mentor, or family member who did something generous or supportive.",
      "Draft a 2-3 sentence message specifying exactly what they did and what it meant to you.",
      "Example: 'I was just reflecting on how much your advice helped me last month — truly grateful for your presence in my corner.'",
      "Hit send without overthinking.",
      "Notice the warm glow of genuine gratitude radiating in your chest."
    ]
  },
  {
    id: "rec_g_body_energy_scan",
    title: "Vitality & Meridian Body Scan",
    category: "Somatic & Nervous Reset",
    categoryKey: "somatic",
    icon: "🌿",
    targetMoods: ["good"],
    minMood: 63,
    maxMood: 76,
    minSleep: 0,
    maxSleep: 60,
    duration: "6 min",
    durationSeconds: 360,
    intensity: "Gentle",
    tags: ["Mindfulness", "Body Scan", "Vitality"],
    summary: "Scan your body not to fix tension, but to appreciate where ease and strength are freely flowing.",
    scienceWhy: "Interoceptive focus on pleasant bodily sensations re-wires the insular cortex toward resilience and somatic optimism.",
    matchBadge: "Pleasure & Vitality Sensing",
    instructions: [
      "Sit back in a relaxed, open posture with hands resting comfortably on your lap.",
      "Bring mindful awareness to your feet and legs, noticing feelings of warmth, stability, and contact.",
      "Move awareness into your chest and heart space, noticing the easy, steady rhythm of your heartbeat.",
      "Notice the natural openness in your throat, jaw, and brow.",
      "Silently thank your body for carrying you faithfully through today."
    ]
  },
  {
    id: "rec_g_habit_anchor",
    title: "Habit Anchor & Future Lock-In",
    category: "Mind & Emotional Care",
    categoryKey: "mindful",
    icon: "⚓",
    targetMoods: ["good"],
    minMood: 63,
    maxMood: 75,
    minSleep: 0,
    maxSleep: 60,
    duration: "4 min",
    durationSeconds: 240,
    intensity: "Moderate",
    tags: ["Habits", "Consistency", "Routine"],
    summary: "Identify the exact habit that supported today's good mood and schedule it for tomorrow.",
    scienceWhy: "Habit formation is most potent when reinforced in the presence of positive emotional feedback.",
    matchBadge: "Sustain Momentum",
    instructions: [
      "Ask yourself: 'What action helped me feel so balanced today? (Sleep, water, conversation, walk, focus)?'",
      "Identify the exact time and context when that action occurred.",
      "Open your calendar or planner and block 15 minutes to repeat that identical habit tomorrow.",
      "Anchor it to an existing cue (e.g. 'Right after my morning coffee, I will take my 10-minute walk').",
      "Celebrate turning an accidental good day into an intentional good week."
    ]
  },
  {
    id: "rec_g_soundtrack_groove",
    title: "Flow-State Audio Calibration",
    category: "Creative & Expressive",
    categoryKey: "creative",
    icon: "🎵",
    targetMoods: ["good"],
    minMood: 62,
    maxMood: 76,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Gentle",
    tags: ["Music", "Focus", "Audio"],
    summary: "Curate a personalized 30-minute soundtrack designed to maintain your positive emotional stride.",
    scienceWhy: "Musical rhythm entrainment synchronizes neural oscillations across motor and emotional networks.",
    matchBadge: "Rhythm Synchronization",
    instructions: [
      "Select instrumental, lo-fi, neo-classical, or deep house music with a steady 60-90 BPM tempo.",
      "Queue up 3 tracks that feel inspiring, steady, and expansive.",
      "Listen with full presence to the first 2 minutes, feeling your rhythm align with the music.",
      "Transition seamlessly into your next task with this acoustic wind at your back.",
      "Enjoy the effortless glide of balanced motivation."
    ]
  },

  /* ------------------------------------------------------------------------
     6. HAPPY MOOD (76 - 86%) · Focus: Energy Direction, Shared Joy & Micro-Wins
     ------------------------------------------------------------------------ */
  {
    id: "rec_h_generosity_spark",
    title: "Spontaneous Spark of Generosity",
    category: "Social & Connection",
    categoryKey: "social",
    icon: "🎁",
    targetMoods: ["happy"],
    minMood: 76,
    maxMood: 86,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Moderate",
    tags: ["Generosity", "Kindness", "Joy"],
    summary: "Transform your high emotional vitality into a ripple effect by uplifting someone else unexpectedly.",
    scienceWhy: "Prosocial spending and kindness activate the ventral striatum, generating a sustainable 'warm glow' reward loop.",
    matchBadge: "Prosocial Joy Ripple",
    instructions: [
      "Think of someone you encountered recently who worked hard (barista, cashier, coworker, friend).",
      "Leave an unusually generous tip, a glowing 5-star public review, or send a heartfelt shoutout to their manager.",
      "Or give someone a sincere, unprompted compliment highlighting their character or effort.",
      "Do it without seeking credit or expectation of return.",
      "Notice how sharing joy multiplies your own happiness tenfold."
    ]
  },
  {
    id: "rec_h_micro_win_celebration",
    title: "Micro-Win Victory Lap",
    category: "Active Momentum",
    categoryKey: "action",
    icon: "🏆",
    targetMoods: ["happy"],
    minMood: 76,
    maxMood: 87,
    minSleep: 0,
    maxSleep: 60,
    duration: "4 min",
    durationSeconds: 240,
    intensity: "Energizing",
    tags: ["Celebration", "Confidence", "Dopamine"],
    summary: "Pause and explicitly celebrate 3 milestones or challenges you have navigated over the past 7 days.",
    scienceWhy: "Dopamine reinforces behaviors that are consciously celebrated, cementing high-agency self-efficacy.",
    matchBadge: "Celebrate Agency",
    instructions: [
      "List 3 things you successfully finished, resisted, or pushed through recently, big or small.",
      "Stand up, pump your fist, or do a brief victory dance in your room (seriously!).",
      "Acknowledge the persistence and skill required to achieve those wins.",
      "Record them in your victory log or notes app for future reference.",
      "Channel that confident swagger directly into your next goal."
    ]
  },
  {
    id: "rec_h_rhythmic_movement",
    title: "Joyful Rhythmic Movement Shake",
    category: "Active Momentum",
    categoryKey: "action",
    icon: "💃",
    targetMoods: ["happy", "veryHappy"],
    minMood: 76,
    maxMood: 90,
    minSleep: 30,
    maxSleep: 60,
    duration: "4 min",
    durationSeconds: 240,
    intensity: "Energizing",
    tags: ["Movement", "Music", "Endorphins"],
    summary: "Put on your favorite upbeat song and move your body with complete freedom and zero inhibition.",
    scienceWhy: "Music-driven physical movement floods the brain with endorphins, dopamine, and endocannabinoids.",
    matchBadge: "Endorphin Expression",
    instructions: [
      "Pick your absolute #1 favorite high-energy, feel-good anthem.",
      "Turn up the volume and let your body move however it wants for the entire track.",
      "Jump, dance, spin, or groove without judging how it looks.",
      "Feel the surge of vitality radiating from your core through your fingertips.",
      "Catch your breath with a bright, wide smile at the end."
    ]
  },
  {
    id: "rec_h_strength_spotting",
    title: "Signature Strength Spotting",
    category: "Journal & Reflection",
    categoryKey: "journal",
    icon: "💎",
    targetMoods: ["happy"],
    minMood: 76,
    maxMood: 86,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Moderate",
    tags: ["Strengths", "VIA Survey", "Confidence"],
    summary: "Identify which of your top character strengths was firing today to produce this happy state.",
    scienceWhy: "Positive psychology shows that deploying VIA character strengths fosters eudaimonic, long-term life satisfaction.",
    matchBadge: "Strength Affirmation",
    instructions: [
      "Reflect on what strength you leaned on today: Humor, Bravery, Kindness, Perspective, Love of Learning, or Teamwork.",
      "Write down the specific instance where you displayed this strength today.",
      "How did applying this strength positively alter the outcome or your mood?",
      "Brainstorm one more way to apply this strength before the sun goes down.",
      "Feel gratitude for the unique superpowers you bring to the world."
    ]
  },
  {
    id: "rec_h_passion_sprint",
    title: "Bold Passion Project Sprint",
    category: "Creative & Expressive",
    categoryKey: "creative",
    icon: "🚀",
    targetMoods: ["happy", "veryHappy"],
    minMood: 77,
    maxMood: 92,
    minSleep: 35,
    maxSleep: 60,
    duration: "15 min",
    durationSeconds: 900,
    intensity: "Moderate",
    tags: ["Passion", "Sprint", "Momentum"],
    summary: "Ride your high motivation wave to make bold, decisive strides on an ambition you love.",
    scienceWhy: "High valence and arousal expand cognitive breadth, making this the ideal moment for risk-tolerant creativity.",
    matchBadge: "High-Drive Creative Block",
    instructions: [
      "Open that project, hobby, or side idea that genuinely excites you.",
      "Set a focused 15-minute countdown timer.",
      "Make the bold design choice, write the daring draft, or build the core prototype without holding back.",
      "Ride the creative momentum without hesitating or second-guessing.",
      "Save your work with satisfaction and pride."
    ]
  },
  {
    id: "rec_h_nature_admiration",
    title: "Nature Wonder & Sunlight Bath",
    category: "Mind & Emotional Care",
    categoryKey: "mindful",
    icon: "🌻",
    targetMoods: ["happy"],
    minMood: 75,
    maxMood: 86,
    minSleep: 0,
    maxSleep: 60,
    duration: "8 min",
    durationSeconds: 480,
    intensity: "Gentle",
    tags: ["Nature", "Sunlight", "Awe"],
    summary: "Soak in direct sunshine and marvel at living plants, clouds, or architectural beauty around you.",
    scienceWhy: "Sunlight exposure elevates nitric oxide and serotonin, while natural fractals induce tranquil alpha brain rhythms.",
    matchBadge: "Sunlight & Awe Infusion",
    instructions: [
      "Step outside under open sky without sunglasses for 8 minutes (do not stare directly at the sun).",
      "Look closely at the veins of a leaf, the pattern of bark, or the flight of birds.",
      "Feel the warmth of the sun radiating on your face, neck, and forearms.",
      "Reflect on how miraculous it is to experience this day in good spirits.",
      "Carry this calm sunshine with you back inside."
    ]
  },

  /* ------------------------------------------------------------------------
     7. VERY HAPPY (87 - 94%) · Focus: Radiant Momentum, Future Visioning & Inspiration
     ------------------------------------------------------------------------ */
  {
    id: "rec_vh_future_letter",
    title: "Letter from Your Peak Self",
    category: "Journal & Reflection",
    categoryKey: "journal",
    icon: "✉️",
    targetMoods: ["veryHappy"],
    minMood: 87,
    maxMood: 94,
    minSleep: 0,
    maxSleep: 60,
    duration: "8 min",
    durationSeconds: 480,
    intensity: "Moderate",
    tags: ["Future Self", "Perspective", "Wisdom"],
    summary: "Capture your vibrant, crystal-clear perspective in a letter to your future self for when times get tough.",
    scienceWhy: "Capturing peak mindset heuristics provides resilient, personalized scaffolding during future dips.",
    matchBadge: "Peak Mindset Capture",
    instructions: [
      "Open your journal or a fresh document titled 'Read When You Need A Reminder'.",
      "Write to your future self from your current radiant, clear perspective.",
      "Remind them: what really matters in life? What worries are actually trivial? How strong are you really?",
      "Pour your present optimism, courage, and perspective into 2 or 3 empowering paragraphs.",
      "Save it in a special bookmark or folder marked 'Open in Case of Fog'."
    ]
  },
  {
    id: "rec_vh_mentor_touchpoint",
    title: "Lifting Someone Up (Mentorship)",
    category: "Social & Connection",
    categoryKey: "social",
    icon: "🤝",
    targetMoods: ["veryHappy"],
    minMood: 87,
    maxMood: 95,
    minSleep: 0,
    maxSleep: 60,
    duration: "10 min",
    durationSeconds: 600,
    intensity: "Moderate",
    tags: ["Mentorship", "Leadership", "Empowerment"],
    summary: "Use your abundance of energy and confidence to encourage someone junior or struggling.",
    scienceWhy: "Empowering others solidifies prosocial identity and produces eudaimonic meaning that outlasts hedonic mood spikes.",
    matchBadge: "Abundance Mentorship",
    instructions: [
      "Identify a junior colleague, friend, or younger family member navigating a challenge.",
      "Send a thoughtful message offering specific encouragement, a helpful resource, or a 10-minute check-in.",
      "Validate their effort and remind them of their demonstrated abilities.",
      "Listen generously without turning the spotlight onto yourself.",
      "Feel the profound fulfillment of becoming a lighthouse for someone else."
    ]
  },
  {
    id: "rec_vh_breakthrough_ideation",
    title: "Blue-Sky Ideation Blitz",
    category: "Creative & Expressive",
    categoryKey: "creative",
    icon: "💡",
    targetMoods: ["veryHappy", "euphoric"],
    minMood: 86,
    maxMood: 98,
    minSleep: 30,
    maxSleep: 60,
    duration: "10 min",
    durationSeconds: 600,
    intensity: "Energizing",
    tags: ["Ideation", "Innovation", "Brainstorm"],
    summary: "Write down 20 audacious ideas without self-censorship while your cognitive horizons are wide open.",
    scienceWhy: "High dopamine and positive valence temporarily disable lateral prefrontal inhibition, enabling lateral leaps.",
    matchBadge: "Audacious Thinking Sprint",
    instructions: [
      "Take a large blank page and write your biggest dream, goal, or creative challenge at the center.",
      "Number lines from 1 to 20.",
      "Force yourself to write 20 wild, unconventional, or exciting solutions or project angles in 8 minutes.",
      "Do not evaluate feasibility until all 20 are written.",
      "Circle the 2 most intriguing concepts to explore further this month."
    ]
  },
  {
    id: "rec_vh_outdoor_immersion",
    title: "High-Paced Outdoor Exploration",
    category: "Active Momentum",
    categoryKey: "action",
    icon: "🏃‍♂️",
    targetMoods: ["veryHappy"],
    minMood: 87,
    maxMood: 94,
    minSleep: 35,
    maxSleep: 60,
    duration: "12 min",
    durationSeconds: 720,
    intensity: "Energizing",
    tags: ["Cardio", "Outdoors", "Vitality"],
    summary: "Go for an energetic jog, brisk uphill walk, or bike ride to match your high internal drive.",
    scienceWhy: "Matching physical output to high affective arousal prevents restless agitation and harmonizes neurochemistry.",
    matchBadge: "Cardiovascular Celebration",
    instructions: [
      "Lace up athletic shoes and step outside with a bold stride.",
      "Elevate your pace to an energetic jog or brisk power-walk.",
      "Feel your heart pumping strong, clean blood to your muscles and brain.",
      "Notice the vibrant colors of the environment as you move through space.",
      "Finish with an open chest stretch and a deep, triumphant breath."
    ]
  },
  {
    id: "rec_vh_gratitude_amplification",
    title: "360° Gratitude Amplification",
    category: "Mind & Emotional Care",
    categoryKey: "mindful",
    icon: "🙏",
    targetMoods: ["veryHappy"],
    minMood: 87,
    maxMood: 94,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Gentle",
    tags: ["Gratitude", "Amplification", "Joy"],
    summary: "Deepen your happiness into reverence by meditating on the web of circumstances that brought you here.",
    scienceWhy: "Gratitude prevents hedonic habituation and deepens emotional resilience for future life cycles.",
    matchBadge: "Reverent Appreciation",
    instructions: [
      "Close your eyes and visualize the path that led to today's high energy.",
      "Thank your body, the mentors who guided you, the challenges that forged your grit.",
      "Feel the profound gift of experiencing life in vibrant color today.",
      "Whisper: 'Thank you for this clarity, vitality, and joy.'",
      "Open your eyes with a soft, peaceful, and radiant perspective."
    ]
  },
  {
    id: "rec_vh_creative_expression",
    title: "Expressive Art / Music Jam",
    category: "Creative & Expressive",
    categoryKey: "creative",
    icon: "🎸",
    targetMoods: ["veryHappy"],
    minMood: 87,
    maxMood: 94,
    minSleep: 30,
    maxSleep: 60,
    duration: "10 min",
    durationSeconds: 600,
    intensity: "Moderate",
    tags: ["Art", "Music", "Expression"],
    summary: "Play an instrument, sketch freely, write poetry, or sing along without any performance anxiety.",
    scienceWhy: "Creative spontaneous play consolidates positive neural states into physical motor memories.",
    matchBadge: "Spontaneous Play & Expression",
    instructions: [
      "Pick up your instrument, sketchbook, journal, or vocal track.",
      "Create freely for 10 minutes without judging whether it is 'good' or 'bad'.",
      "Let your joy and vibrant mood dictate the rhythm and color choices.",
      "Celebrate the pure joy of self-expression for its own sake.",
      "Save or snap a picture of your creation as a memento of today's high energy."
    ]
  },

  /* ------------------------------------------------------------------------
     8. EUPHORIC MOOD (95 - 100%) · Focus: Grounded Euphoria, Epiphany Capture & Down-Regulation
     ------------------------------------------------------------------------ */
  {
    id: "rec_eu_grounded_zenith",
    title: "Grounded Euphoria Meditation",
    category: "Mind & Emotional Care",
    categoryKey: "mindful",
    icon: "✨",
    targetMoods: ["euphoric"],
    minMood: 95,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 60,
    duration: "6 min",
    durationSeconds: 360,
    intensity: "Gentle",
    tags: ["Euphoria", "Centering", "Grounding"],
    summary: "Anchor peak ecstatic vitality into your bones so it becomes calm wisdom rather than scattered restlessness.",
    scienceWhy: "Peak euphoric states can risk hyper-reactivity or subsequent dopamine crashes; gentle somatic anchoring balances autonomic tone.",
    matchBadge: "Euphoria Centering & Wisdom",
    instructions: [
      "Sit comfortably with your spine tall, regal, and deeply rooted into the earth.",
      "Feel the electric, sparkling energy flowing through your veins and chest.",
      "Instead of letting it scatter your attention, breathe it down into your center — your solar plexus and belly.",
      "Feel this immense energy stabilizing into calm, unshakable power and peace.",
      "Affirm: 'I am centered, grounded, and clear amidst this profound vitality.'"
    ]
  },
  {
    id: "rec_eu_epiphany_catcher",
    title: "Epiphany & Vision Voice Memo",
    category: "Creative & Expressive",
    categoryKey: "creative",
    icon: "🎙️",
    targetMoods: ["euphoric"],
    minMood: 95,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Energizing",
    tags: ["Epiphany", "Audio", "Vision"],
    summary: "Record a rapid voice memo capturing the luminous insights, solutions, and connections flooding your mind.",
    scienceWhy: "Euphoric states generate hyper-connected associative leaps; audio recording captures nuances before working memory clears them.",
    matchBadge: "High-Frequency Insight Capture",
    instructions: [
      "Open your phone's voice recorder app or audio memo.",
      "Press record and speak out loud the big insights, creative breakthroughs, and feelings you are currently experiencing.",
      "Speak without filter for 4 minutes — describe what you see, understand, and feel inspired to do.",
      "Title the recording 'Peak State Revelation — [Today's Date]'.",
      "Keep this treasure trove to guide your strategy and artistic work over coming months."
    ]
  },
  {
    id: "rec_eu_down_regulate_buffer",
    title: "Gentle Evening Down-Regulation Buffer",
    category: "Somatic & Nervous Reset",
    categoryKey: "somatic",
    icon: "🌙",
    targetMoods: ["euphoric", "veryHappy"],
    minMood: 90,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 45,
    duration: "7 min",
    durationSeconds: 420,
    intensity: "Gentle",
    tags: ["Sleep Protection", "Down-Regulation", "Calm"],
    summary: "Softly taper high neurological arousal before nightfall to prevent euphoria from turning into 3 AM insomnia.",
    scienceWhy: "High dopamine and norepinephrine can delay sleep-onset latency; a deliberate cooling buffer preserves nighttime restorative cycles.",
    matchBadge: "Prevent Euphoria Insomnia",
    instructions: [
      "Lower the ambient lighting in your space and put all bright screens away.",
      "Lie down flat with your legs elevated on pillows or against the wall (Viparita Karani).",
      "Place your hands on your lower abdomen and practice 10 slow, warm belly breaths.",
      "Let the dazzling excitement of the day settle into deep, nourishing satisfaction.",
      "Trust that all your wonderful ideas will be waiting safely for you tomorrow."
    ]
  },
  {
    id: "rec_eu_transcendent_kindness",
    title: "Radical Secret Kindness",
    category: "Social & Connection",
    categoryKey: "social",
    icon: "💖",
    targetMoods: ["euphoric"],
    minMood: 95,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Moderate",
    tags: ["Altruism", "Anonymous", "Heart"],
    summary: "Perform an act of kindness entirely in secret — leave a book with an uplifting note, or pay for someone anonymously.",
    scienceWhy: "Pure altruism activates the subgenual anterior cingulate cortex, anchoring peak joy in profound social connection.",
    matchBadge: "Transcendent Altruism",
    instructions: [
      "Find a small, meaningful way to bless someone anonymously.",
      "Examples: hide an uplifting sticky note in a library book, pay forward a stranger's coffee, clean up a shared space without telling anyone.",
      "Execute the gesture quietly with joyful secrecy.",
      "Walk away smiling, keeping the secret entirely between you and the universe.",
      "Feel the deep spiritual beauty of selfless joy."
    ]
  },
  {
    id: "rec_eu_grand_creative_stroke",
    title: "Masterpiece Outline / Core Vision",
    category: "Creative & Expressive",
    categoryKey: "creative",
    icon: "🏛️",
    targetMoods: ["euphoric"],
    minMood: 95,
    maxMood: 100,
    minSleep: 30,
    maxSleep: 60,
    duration: "15 min",
    durationSeconds: 900,
    intensity: "Energizing",
    tags: ["Masterpiece", "Vision", "Creation"],
    summary: "Draft the high-level architecture of your most ambitious, lifelong creative project.",
    scienceWhy: "Transcendent psychological states facilitate macro-level thematic synthesis and fearless conceptual leaps.",
    matchBadge: "Masterpiece Architecture",
    instructions: [
      "Take your largest notebook or whiteboarding canvas.",
      "Map out the 5 pillars of the grandest project you dream of creating.",
      "Connect themes, character arcs, business models, or philosophical questions fearless of boundaries.",
      "Work with the joyous conviction that you possess all the vitality needed to realize it.",
      "Step back and admire the clarity of your vision."
    ]
  },
  {
    id: "rec_eu_stillness_in_flight",
    title: "Stillness In Flight (Zen Balance)",
    category: "Mind & Emotional Care",
    categoryKey: "mindful",
    icon: "🦅",
    targetMoods: ["euphoric"],
    minMood: 95,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 60,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Gentle",
    tags: ["Zen", "Stillness", "Poise"],
    summary: "Balance high ecstasy with absolute stillness, like an eagle soaring motionless on high thermal drafts.",
    scienceWhy: "Cultivates equanimity within peak emotional experiences, preventing manic burnout or post-euphoria depletion.",
    matchBadge: "Equanimity at the Peak",
    instructions: [
      "Sit motionless in upright stillness for 5 full minutes.",
      "Notice how high the vibration feels inside you, while your exterior remains completely calm and silent.",
      "Experience the unity of dynamic energy and absolute stillness existing simultaneously.",
      "Rest in this elevated poise.",
      "Bow gently to your practice as you open your eyes."
    ]
  },

  /* ------------------------------------------------------------------------
     9. SLEEP DEPLETED (< 35 min / < 58% rest) · Focus: NSDR, Recovery & Low Cognitive Load
     ------------------------------------------------------------------------ */
  {
    id: "rec_sl_nsdr_nidra",
    title: "Non-Sleep Deep Rest (NSDR / Yoga Nidra)",
    category: "Sleep & Recovery",
    categoryKey: "sleep",
    icon: "🛌",
    targetMoods: ["all"],
    targetSleep: "depleted",
    minMood: 0,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 34,
    duration: "10 min",
    durationSeconds: 600,
    intensity: "Gentle",
    tags: ["NSDR", "Huberman", "Sleep Debt", "Restoration"],
    summary: "Recover dopamine and restore mental clarity without needing to fall into full sleep.",
    scienceWhy: "Dr. Andrew Huberman's NSDR protocols trigger restorative theta wave patterns, restoring striatal dopamine and cognitive focus.",
    matchBadge: "Sleep Deficit Antidote",
    instructions: [
      "Lie down on a bed, couch, or floor with a pillow under your head and knees.",
      "Cover your eyes with a soft cloth or eye mask to block all photons.",
      "Take two long, slow physiological sighs to release all muscular tension.",
      "Mentally rotate your awareness through your limbs: right hand, right arm, left hand, left arm, legs, and face.",
      "Remain in suspended, effortless relaxation until the gentle chime rings."
    ]
  },
  {
    id: "rec_sl_digital_sunset",
    title: "Digital Sunset & Blue-Light Curfew",
    category: "Sleep & Recovery",
    categoryKey: "sleep",
    icon: "🌅",
    targetMoods: ["all"],
    targetSleep: "depleted",
    minMood: 0,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 36,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Gentle",
    tags: ["Melatonin", "Circadian", "Screens"],
    summary: "Eliminate blue light to kickstart natural melatonin production after low-rest check-ins.",
    scienceWhy: "Short-wavelength (460-480nm) light suppresses pineal melatonin synthesis by activating intrinsically photosensitive retinal ganglion cells.",
    matchBadge: "Melatonin Protection",
    instructions: [
      "Turn on 'Night Shift' or warm display mode on all computers and phones immediately.",
      "Turn off harsh overhead ceiling lights and switch to low-level warm lamps or amber lighting.",
      "Commit to turning off all social media and notifications at least 60 minutes before bed tonight.",
      "Set your phone to charge across the room, out of arm's reach from your mattress.",
      "Notice your eyes immediately feeling less strained and tired."
    ]
  },
  {
    id: "rec_sl_bedside_brain_dump",
    title: "Bedside 'Worry & To-Do' Cognitive Offload",
    category: "Sleep & Recovery",
    categoryKey: "sleep",
    icon: "📋",
    targetMoods: ["all"],
    targetSleep: "depleted",
    minMood: 0,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 38,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Gentle",
    tags: ["Insomnia", "To-Do Offload", "Sleep Hygiene"],
    summary: "Write down tomorrow's to-do list so your brain doesn't loop through them all night.",
    scienceWhy: "Baylor University study (Scullin et al.) found that writing a specific bedtime to-do list caused participants to fall asleep 37% faster.",
    matchBadge: "Overnight Mental Offload",
    instructions: [
      "Keep a physical pen and notepad right beside your bedside table.",
      "List out the top 3-5 specific tasks you need to handle tomorrow.",
      "Beside each one, write down the very first physical action step.",
      "Physically close the notebook and say: 'These are handled on paper. My mind is free to sleep.'",
      "Rest easy knowing your priorities are safely captured."
    ]
  },
  {
    id: "rec_sl_warm_hydrotherapy",
    title: "Thermal Warm Shower Sleep-Onset",
    category: "Sleep & Recovery",
    categoryKey: "sleep",
    icon: "🚿",
    targetMoods: ["all"],
    targetSleep: "depleted",
    minMood: 0,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 35,
    duration: "8 min",
    durationSeconds: 480,
    intensity: "Gentle",
    tags: ["Hydrotherapy", "Circadian", "Core Temp"],
    summary: "A warm shower 90 minutes before bed induces vasodilation and rapid core body cooling for sleep.",
    scienceWhy: "Warming the extremities increases peripheral blood flow, cooling core body temperature — the primary circadian trigger for sleep onset.",
    matchBadge: "Thermoregulatory Sleep Trigger",
    instructions: [
      "Take a warm, soothing shower or soak your feet in warm water for 8 minutes.",
      "Let the warm water stream down your neck, shoulders, and upper back.",
      "Step out into a cool room and towel off gently.",
      "Notice the natural drop in your core body temperature as heat radiates away.",
      "Slip into comfortable sleepwear as deep drowsiness begins to set in."
    ]
  },
  {
    id: "rec_sl_inbed_48_breathing",
    title: "In-Bed 4-8 Heavy Body Breathing",
    category: "Sleep & Recovery",
    categoryKey: "sleep",
    icon: "🛌",
    targetMoods: ["all"],
    targetSleep: "depleted",
    minMood: 0,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 36,
    duration: "6 min",
    durationSeconds: 360,
    intensity: "Gentle",
    tags: ["Sleep Onset", "In-Bed", "Breathing"],
    summary: "A gentle in-bed rhythm that doubles the exhale length to melt into the mattress.",
    scienceWhy: "Prolonged exhalations stimulate the parasympathetic nervous system, lowering heart rate below 60 BPM to facilitate stage-1 NREM sleep.",
    matchBadge: "Sleep Onset Accelerator",
    instructions: [
      "Lie comfortably under your duvet with head supported and eyes gently closed.",
      "Inhale through your nose softly for a count of 4.",
      "Exhale through parted lips or nose for a slow, warm count of 8.",
      "With every exhale, imagine your mattress rising up to hold your entire weight.",
      "Repeat for 15 cycles, letting yourself drift into peaceful rest."
    ]
  },
  {
    id: "rec_sl_low_demand_triage",
    title: "Low-Energy Cognitive Triage",
    category: "Sleep & Recovery",
    categoryKey: "sleep",
    icon: "🛡️",
    targetMoods: ["all"],
    targetSleep: "depleted",
    minMood: 0,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 34,
    duration: "4 min",
    durationSeconds: 240,
    intensity: "Gentle",
    tags: ["Triage", "Energy Protection", "Priorities"],
    summary: "Cancel or postpone non-urgent tasks today to protect your compromised energy reserves.",
    scienceWhy: "Operating on severe sleep debt impairs executive inhibition, dramatically increasing burnout and costly decision errors.",
    matchBadge: "Triage & Boundary Defense",
    instructions: [
      "Look at today's calendar and identify the single most energy-draining non-essential task.",
      "Politely reschedule, delegate, or decline it to another day.",
      "Define only ONE single critical milestone to accomplish today.",
      "Permit yourself to rest, nap, or go to bed early without guilt.",
      "Acknowledge that strategic pacing today prevents an extended crash tomorrow."
    ]
  },

  /* ------------------------------------------------------------------------
     10. SLEEP MODERATE (35 - 48 min / 58 - 80% rest) · Focus: Circadian Anchors & Optimization
     ------------------------------------------------------------------------ */
  {
    id: "rec_sm_sunlight_anchor",
    title: "10-Minute Morning Sunlight Anchor",
    category: "Sleep & Recovery",
    categoryKey: "sleep",
    icon: "☀️",
    targetMoods: ["all"],
    targetSleep: "moderate",
    minMood: 0,
    maxMood: 100,
    minSleep: 35,
    maxSleep: 48,
    duration: "10 min",
    durationSeconds: 600,
    intensity: "Gentle",
    tags: ["Circadian", "Light Therapy", "Cortisol"],
    summary: "Anchor your suprachiasmatic circadian clock by viewing outdoor sunlight within 60 minutes of waking.",
    scienceWhy: "Viewing 10,000+ lux natural photon flux triggers the cortisol awakening response and starts the 14-hour timer for tonight's melatonin surge.",
    matchBadge: "Circadian Clock Synchronization",
    instructions: [
      "Step outside into natural daylight within 1 hour of getting out of bed.",
      "Look toward the sun without staring directly at it (sunglasses off, corrective lenses fine).",
      "Spend 10 minutes walking or sitting outside (increase to 15-20 mins if overcast).",
      "Feel the wakefulness hormones surge naturally, clearing out sleep inertia.",
      "Lock this in as your most non-negotiable morning foundation."
    ]
  },
  {
    id: "rec_sm_caffeine_curfew",
    title: "Caffeine Half-Life Cutoff Protocol",
    category: "Sleep & Recovery",
    categoryKey: "sleep",
    icon: "☕",
    targetMoods: ["all"],
    targetSleep: "moderate",
    minMood: 0,
    maxMood: 100,
    minSleep: 32,
    maxSleep: 48,
    duration: "2 min",
    durationSeconds: 120,
    intensity: "Gentle",
    tags: ["Caffeine", "Adenosine", "Sleep Architecture"],
    summary: "Stop caffeine intake 8 to 10 hours before your targeted bedtime to preserve deep stage-3/4 delta sleep.",
    scienceWhy: "Caffeine has a 5-7 hour half-life and blocks adenosine A1/A2A receptors, fracturing restorative slow-wave sleep even if you fall asleep fine.",
    matchBadge: "Slow-Wave Sleep Protector",
    instructions: [
      "Calculate your bedtime minus 9 hours (e.g. 10:30 PM bedtime = 1:30 PM cutoff).",
      "Switch entirely to water, sparkling water, or non-caffeinated herbal teas past this hour.",
      "If you experience a midday energy lull, use a brisk walk or cold water splash instead.",
      "Observe how much deeper and uninterrupted tonight's sleep feels.",
      "Wake up tomorrow feeling truly rested rather than caffeine-dependent."
    ]
  },
  {
    id: "rec_sm_sanctuary_audit",
    title: "Sleep Chamber Environment Audit",
    category: "Sleep & Recovery",
    categoryKey: "sleep",
    icon: "🛏️",
    targetMoods: ["all"],
    targetSleep: "moderate",
    minMood: 0,
    maxMood: 100,
    minSleep: 35,
    maxSleep: 48,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Gentle",
    tags: ["Sleep Hygiene", "Sanctuary", "Environment"],
    summary: "Optimize temperature, total darkness, and air quality in your bedroom for uninterrupted rest.",
    scienceWhy: "Ambient room temperature between 65-68°F (18-20°C) and absolute darkness optimize sleep architecture and REM stability.",
    matchBadge: "Sleep Chamber Optimization",
    instructions: [
      "Set your bedroom thermostat or crack a window to target 66–68°F (18–20°C).",
      "Cover all glowing LED indicator lights (chargers, routers, TVs) with electrical tape or cloth.",
      "Check that your curtains block streetlight glare, or place a comfortable eye mask on your pillow.",
      "Fluff and air out your pillows so they support natural cervical spine alignment.",
      "Step into your upgraded sanctuary tonight with anticipation."
    ]
  },
  {
    id: "rec_sm_evening_winddown",
    title: "30-Minute Evening Buffer Cadence",
    category: "Sleep & Recovery",
    categoryKey: "sleep",
    icon: "🕯️",
    targetMoods: ["all"],
    targetSleep: "moderate",
    minMood: 0,
    maxMood: 100,
    minSleep: 35,
    maxSleep: 48,
    duration: "6 min",
    durationSeconds: 360,
    intensity: "Gentle",
    tags: ["Winddown", "Routine", "Sleep Quality"],
    summary: "Establish a sacred 30-minute transition boundary between active work and sleep.",
    scienceWhy: "A predictable pre-sleep behavioral routine conditions the brain via Pavlovian stimulus control to initiate sleep pathways.",
    matchBadge: "Pre-Sleep Conditioned Cue",
    instructions: [
      "Decide on a fixed 30-minute wind-down window before sleep tonight.",
      "Engage only in low-arousal activities: reading physical books, light stretching, or soothing music.",
      "Do not discuss finances, controversial news, or stressful work emails during this buffer.",
      "Sip a calming warm herbal chamomile or peppermint tea.",
      "Slip into bed the moment your eyelids feel naturally heavy."
    ]
  },
  {
    id: "rec_sm_magnesium_tea",
    title: "Herbal & Mineral Evening Elixir",
    category: "Sleep & Recovery",
    categoryKey: "sleep",
    icon: "🍵",
    targetMoods: ["all"],
    targetSleep: "moderate",
    minMood: 0,
    maxMood: 100,
    minSleep: 35,
    maxSleep: 48,
    duration: "4 min",
    durationSeconds: 240,
    intensity: "Gentle",
    tags: ["Nutrition", "Magnesium", "Relaxation"],
    summary: "Sip a warm evening tonic of chamomile, tart cherry, or magnesium L-threonate/glycinate.",
    scienceWhy: "Magnesium acts as an NMDA receptor antagonist and GABA agonist, promoting smooth central nervous relaxation.",
    matchBadge: "GABA Relaxation Support",
    instructions: [
      "Boil water and steep loose-leaf chamomile, passionflower, or valerian tea for 5 minutes.",
      "Add a pinch of magnesium glycinate or honey if desired.",
      "Sip slowly while breathing in the soothing herbal steam.",
      "Feel the subtle release of tension in your jaw and stomach.",
      "Turn off the kitchen lights and transition toward bed."
    ]
  },

  /* ------------------------------------------------------------------------
     11. SLEEP RESTORATIVE (> 48 min / > 80% rest) · Focus: Peak Focus, Momentum & Workout
     ------------------------------------------------------------------------ */
  {
    id: "rec_sr_deep_work_sprint",
    title: "Morning Deep-Work Power Block",
    category: "Active Momentum",
    categoryKey: "action",
    icon: "⚡",
    targetMoods: ["all"],
    targetSleep: "restorative",
    minMood: 40,
    maxMood: 100,
    minSleep: 49,
    maxSleep: 60,
    duration: "20 min",
    durationSeconds: 1200,
    intensity: "Energizing",
    tags: ["Deep Work", "Peak Focus", "Cognitive High"],
    summary: "Deploy your fully restored prefrontal cortex to conquer your hardest, most complex problem first.",
    scienceWhy: "Complete NREM/REM cycles replenish glycogen in astrocyte networks and clear metabolic waste, maximizing cognitive bandwidth.",
    matchBadge: "Restored Brain Advantage",
    instructions: [
      "Identify the #1 most challenging, analytically demanding task on your radar.",
      "Close all browser tabs, silence notifications, and lock in full-screen focus.",
      "Set a dedicated 20-minute timer and attack the core difficulty with vigor.",
      "Capitalize on the supreme focus of an undisturbed, fully restorative sleep night.",
      "Finish the block having crushed the day's heaviest resistance before noon."
    ]
  },
  {
    id: "rec_sr_high_output_training",
    title: "High-Output Physical Training Block",
    category: "Active Momentum",
    categoryKey: "action",
    icon: "🏋️‍♂️",
    targetMoods: ["all"],
    targetSleep: "restorative",
    minMood: 50,
    maxMood: 100,
    minSleep: 49,
    maxSleep: 60,
    duration: "15 min",
    durationSeconds: 900,
    intensity: "Energizing",
    tags: ["Workout", "Strength", "Endurance"],
    summary: "Take full advantage of muscle glycogen replenishment and cellular repair with an invigorating workout.",
    scienceWhy: "Restorative sleep optimizes growth hormone pulses and neuromuscular readiness, lowering injury risk and raising power output.",
    matchBadge: "Peak Athletic Readiness",
    instructions: [
      "Warm up your joints with arm circles, hip openers, and leg swings for 3 minutes.",
      "Perform a 12-minute circuit: bodyweight squats, push-ups, lunges, and plank holds.",
      "Push your exertion with confidence knowing your muscle tissue is fully repaired.",
      "Cool down with long, deep hamstring and chest stretches.",
      "Feel the sublime endorphin glow of high physical vitality."
    ]
  },
  {
    id: "rec_sr_circadian_streak",
    title: "Sleep-Wake Consistency Streak",
    category: "Sleep & Recovery",
    categoryKey: "sleep",
    icon: "📈",
    targetMoods: ["all"],
    targetSleep: "restorative",
    minMood: 0,
    maxMood: 100,
    minSleep: 49,
    maxSleep: 60,
    duration: "3 min",
    durationSeconds: 180,
    intensity: "Gentle",
    tags: ["Consistency", "Circadian", "Streak"],
    summary: "Lock in tonight's bedtime within 30 minutes of yesterday to build an unbreakable circadian rhythm.",
    scienceWhy: "Consistent sleep timing (low social jetlag) has stronger positive associations with academic and career performance than sleep duration alone.",
    matchBadge: "Circadian Rhythm Lock",
    instructions: [
      "Check what time you went to bed and woke up for this restorative session.",
      "Commit to getting into bed within 20 minutes of that exact same time tonight.",
      "Set an alarm on your phone for 1 hour before that bedtime titled 'Wind-down sequence'.",
      "Notice how your body anticipates sleep and wakes up naturally without an alarm clock.",
      "Celebrate your mastery of restorative sleep hygiene."
    ]
  },
  {
    id: "rec_sr_creative_flow_block",
    title: "Expansive Strategic Visioning",
    category: "Creative & Expressive",
    categoryKey: "creative",
    icon: "🔭",
    targetMoods: ["all"],
    targetSleep: "restorative",
    minMood: 60,
    maxMood: 100,
    minSleep: 49,
    maxSleep: 60,
    duration: "12 min",
    durationSeconds: 720,
    intensity: "Moderate",
    tags: ["Strategy", "Vision", "Clarity"],
    summary: "Work on long-term 6-month horizons while your cognitive clarity is at peak levels.",
    scienceWhy: "Quality REM sleep enhances cross-cortical associative connections, enabling nuanced long-range strategic synthesis.",
    matchBadge: "Macro Strategy Advantage",
    instructions: [
      "Step away from granular daily tickets and emails.",
      "Write down: 'Where do I want my wellness, career, and personal life to be in 6 months?'",
      "Brainstorm key strategic milestones without being distracted by short-term fires.",
      "Draft 3 high-impact leverage points that will move the needle most.",
      "Re-enter your day anchored in long-term confidence."
    ]
  },

  /* ------------------------------------------------------------------------
     12. MULTI-METRIC SYNERGIES · Complex Cross-Dimension Scenarios
     ------------------------------------------------------------------------ */
  {
    id: "rec_syn_low_mood_low_sleep",
    title: "Restorative Triage & Minimal Load",
    category: "Multi-Metric Synergy",
    categoryKey: "somatic",
    icon: "🛡️",
    targetMoods: ["veryLow", "low", "uneasy"],
    targetSleep: "depleted",
    minMood: 0,
    maxMood: 40,
    minSleep: 0,
    maxSleep: 35,
    duration: "5 min",
    durationSeconds: 300,
    intensity: "Gentle",
    tags: ["Synergy", "Triage", "Crisis Protection"],
    summary: "Critical self-compassion protocol when depleted sleep and low mood compound together.",
    scienceWhy: "Combined low sleep and low valence amplify emotional reactivity by 60%; protective disengagement prevents catastrophic burnout.",
    matchBadge: "Dual Depletion Triage",
    instructions: [
      "Acknowledge the objective biological reality: your brain is operating on low sleep fuel AND emotional strain.",
      "Drop all high-stakes self-demands today — do not make permanent decisions or evaluate your self-worth.",
      "Wear warm, comfortable clothing and drink a full glass of electrolyte or warm water.",
      "Focus exclusively on gentle maintenance tasks; postpone all high-intensity friction.",
      "Go to bed 60 minutes early tonight with a quiet heart."
    ]
  },
  {
    id: "rec_syn_high_mood_low_sleep",
    title: "Over-Drive Guard & Rest Cushion",
    category: "Multi-Metric Synergy",
    categoryKey: "mindful",
    icon: "⚠️",
    targetMoods: ["happy", "veryHappy", "euphoric"],
    targetSleep: "depleted",
    minMood: 75,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 36,
    duration: "6 min",
    durationSeconds: 360,
    intensity: "Gentle",
    tags: ["Synergy", "Over-Drive", "Burnout Prevention"],
    summary: "Protect yourself from an adrenaline crash when high mood masks underlying physical sleep deprivation.",
    scienceWhy: "Dopamine can mask acute exhaustion, creating a deceptive state that leads to sudden burnout if not consciously mitigated.",
    matchBadge: "Adrenaline Burnout Shield",
    instructions: [
      "Recognize that your high energy might be fueled by cortisol/adrenaline compensatory spikes.",
      "Pace yourself deliberately — avoid agreeing to 5 new commitments in this high-energy window.",
      "Take a quiet 10-minute eyes-closed rest break after lunch without checking your phone.",
      "Avoid excess caffeine past 12 PM so your body can settle naturally.",
      "Ensure you schedule a long, restorative sleep tonight to safeguard your happiness."
    ]
  },
  {
    id: "rec_syn_high_stress_any_mood",
    title: "Vagal Dive Reflex Ice-Water Splash",
    category: "Multi-Metric Synergy",
    categoryKey: "somatic",
    icon: "🧊",
    targetMoods: ["all"],
    targetSleep: "any",
    minMood: 0,
    maxMood: 100,
    minSleep: 0,
    maxSleep: 60,
    duration: "2 min",
    durationSeconds: 120,
    intensity: "Moderate",
    tags: ["Mammalian Dive Reflex", "Vagus Nerve", "Stress Relief"],
    summary: "Trigger the mammalian dive reflex with cold water to immediately lower heart rate and blunt high stress.",
    scienceWhy: "Cold water stimulation of ophthalmic branches of the trigeminal nerve activates vagal efferents, slowing heart rate by 10-25% in seconds.",
    matchBadge: "Mammalian Dive Reflex",
    instructions: [
      "Go to the sink and run cold tap water or fill a bowl with ice water.",
      "Take a breath and submerge your face (or splash ice-cold water over your eyes and cheeks) for 15 seconds.",
      "Alternatively, hold an ice pack wrapped in a paper towel against your eyes and cheekbones.",
      "Breathe out slowly as you feel your pulse immediately decelerate.",
      "Pat dry and notice the profound stillness washing over your chest."
    ]
  },
  {
    id: "rec_syn_high_mood_high_sleep",
    title: "Peak Performance Flow Masterclass",
    category: "Multi-Metric Synergy",
    categoryKey: "action",
    icon: "👑",
    targetMoods: ["happy", "veryHappy", "euphoric"],
    targetSleep: "restorative",
    minMood: 75,
    maxMood: 100,
    minSleep: 48,
    maxSleep: 60,
    duration: "25 min",
    durationSeconds: 1500,
    intensity: "Energizing",
    tags: ["Peak Performance", "Flow State", "Triumph"],
    summary: "Unleash your full potential during this rare window of peak mood and optimal restorative rest.",
    scienceWhy: "Concurrently optimal sleep architecture and positive affective valence maximize cognitive resilience, working memory, and creative execution.",
    matchBadge: "Unstoppable Flow State",
    instructions: [
      "Acknowledge this rare biological jackpot: fully rested brain + radiant emotional vitality.",
      "Set your sights on your boldest goal or creative breakthrough.",
      "Block out 25 minutes of completely uninterrupted deep work.",
      "Attack the project with joyful ferocity, precision, and boundless optimism.",
      "End the session having created something you will be proud of for years."
    ]
  }
];

/* Helper to retrieve filtered recommendations based on session metrics */
window.getSmartRecommendations = function(metrics, filterCategory = "all") {
  const pool = window.RECOMMENDATIONS_POOL || [];
  if (!metrics) return pool.slice(0, 4);

  const moodScore = Number(metrics.mood || 50);
  const sleepMin = Number(metrics.sleep || 40);
  const stressScore = Number(metrics.stress || 40);
  const energyScore = Number(metrics.energy || 50);
  const dominantMood = (metrics.dominant || "").toLowerCase();

  // Determine sleep tier: depleted, moderate, restorative
  const sleepTier = sleepMin < 35 ? "depleted" : sleepMin <= 48 ? "moderate" : "restorative";

  // Determine mood tier key
  let moodKey = "neutral";
  if (moodScore <= 20) moodKey = "veryLow";
  else if (moodScore <= 35) moodKey = "low";
  else if (moodScore <= 48) moodKey = "uneasy";
  else if (moodScore <= 62) moodKey = "neutral";
  else if (moodScore <= 75) moodKey = "good";
  else if (moodScore <= 86) moodKey = "happy";
  else if (moodScore <= 94) moodKey = "veryHappy";
  else moodKey = "euphoric";

  // Score each item in the pool
  const scored = pool.map(item => {
    let score = 0;

    // Mood match
    if (item.targetMoods.includes(moodKey) || item.targetMoods.includes("all")) {
      score += 45;
    }
    // Proximity to mood range
    if (moodScore >= item.minMood && moodScore <= item.maxMood) {
      score += 35;
    } else {
      const dist = Math.min(Math.abs(moodScore - item.minMood), Math.abs(moodScore - item.maxMood));
      score += Math.max(0, 20 - dist * 0.8);
    }

    // Sleep match
    if (item.targetSleep === sleepTier) {
      score += 40;
    } else if (item.targetSleep === "any") {
      score += 15;
    }
    if (sleepMin >= item.minSleep && sleepMin <= item.maxSleep) {
      score += 20;
    }

    // High Stress special weighting
    if (stressScore > 65) {
      if (item.categoryKey === "somatic" || item.tags.includes("Anxiety") || item.tags.includes("Stress Relief")) {
        score += 35;
      }
    }

    // Low Energy special weighting
    if (energyScore < 30) {
      if (item.intensity === "Gentle") score += 20;
      if (item.intensity === "Energizing") score -= 25;
    } else if (energyScore > 75) {
      if (item.intensity === "Energizing") score += 20;
    }

    // Multi-metric synergy boosts
    if (moodScore <= 40 && sleepMin < 35 && item.id === "rec_syn_low_mood_low_sleep") score += 60;
    if (moodScore >= 75 && sleepMin < 36 && item.id === "rec_syn_high_mood_low_sleep") score += 60;
    if (moodScore >= 75 && sleepMin >= 48 && item.id === "rec_syn_high_mood_high_sleep") score += 60;
    if (stressScore > 68 && item.id === "rec_syn_high_stress_any_mood") score += 55;

    return { item, score };
  });

  // Sort descending by match score
  scored.sort((a, b) => b.score - a.score);

  // Filter by category if requested
  let candidates = scored;
  if (filterCategory === "mood") {
    const primary = scored.filter(s => s.item.categoryKey === "mindful" || s.item.categoryKey === "journal");
    const secondary = scored.filter(s => !primary.includes(s) && s.item.targetMoods.includes(moodKey));
    candidates = primary.concat(secondary);
  } else if (filterCategory === "sleep") {
    const primary = scored.filter(s => s.item.categoryKey === "sleep");
    const secondary = scored.filter(s => !primary.includes(s) && (s.item.targetSleep === sleepTier || s.item.tags.includes("Sleep") || s.item.tags.includes("Circadian")));
    candidates = primary.concat(secondary);
  } else if (filterCategory === "quick") {
    candidates = scored.filter(s => s.item.durationSeconds <= 300);
  } else if (filterCategory === "somatic") {
    const primary = scored.filter(s => s.item.categoryKey === "somatic" || s.item.categoryKey === "action");
    const secondary = scored.filter(s => !primary.includes(s) && s.item.tags.includes("Somatic"));
    candidates = primary.concat(secondary);
  }

  // Ensure diversity in top results for "all": pick distinct categories
  const selected = [];
  const seenCategories = new Set();

  for (const entry of candidates) {
    if (selected.length >= 8) break;
    const cat = entry.item.categoryKey;
    // For top 4, encourage diversity
    if (selected.length < 4 && seenCategories.has(cat) && candidates.length > 6) {
      continue;
    }
    selected.push(entry.item);
    seenCategories.add(cat);
  }

  // Fallback if diversity skipped too many
  if (selected.length < 4) {
    for (const entry of candidates) {
      if (!selected.includes(entry.item)) {
        selected.push(entry.item);
      }
      if (selected.length >= 8) break;
    }
  }

  return selected;
};
