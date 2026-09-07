# Mindful Dashboard

mage 1 — Dashboard direction

Use it as inspiration for the general feeling of the dashboard: modern wellness application, spacious cards, soft rounded UI, statistics, reports, upcoming activity, and a prominent visual centerpiece.

Image 2 — Brain reference ONLY

The second image contains a 3D glossy brain.

Use the brain from the second reference as the visual reference for the brain illustration only.

Do NOT recreate the entire second image.

Do NOT copy its dashboard layout.

Do NOT copy its purple color palette.

Do NOT reproduce its cards, navigation, statistics or exact positioning.

The second image is only telling you:

"This is the type of glossy 3D brain that should appear in my dashboard."

The dashboard itself must be an original design based on the requirements below.

1. TECH STACK

Use only:

HTML5

CSS3

Vanilla JavaScript

Do not use:

React

Vue

Angular

Bootstrap

Tailwind

jQuery

Any frontend framework

Do not use a chart library unless absolutely necessary. Prefer SVG/CSS/JavaScript for charts.

Create:

index.html

style.css

script.js

assets/

The page must work by opening index.html in a browser.

2. OVERALL DESIGN CONCEPT

Create a premium, modern, emotion-aware wellness dashboard.

The dashboard should communicate:

emotional wellbeing

mood tracking

personal progress

behavioral patterns

questionnaire history

smart/AI-generated insights

personalized recommendations

It should feel:

calm

warm

intelligent

trustworthy

modern

human

premium

It should NOT look like:

a hospital management system

a clinical medical dashboard

a generic admin panel

a finance dashboard

a childish mental-health app

3. PAGE STRUCTURE

Build the entire dashboard as one complete responsive page.

The overall hierarchy should be:

┌────────────────────────────────────────────────────────────┐

│ HEADER                                                     │

│ Avatar  Hello, Sara 👋                     Navigation       │

└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐

│  STAT 1       │  STAT 2       │  STAT 3                  │

└────────────────────────────────────────────────────────────┘

┌─────────────────────────────┬──────────────────────────────┐

│                             │                              │

│                             │  WEEKLY MOOD WAVE            │

│      3D BRAIN               │  Chart                       │

│                             │                              │

│                             │  MOOD MIX                    │

│                             │  Emotional states            │

└─────────────────────────────┴──────────────────────────────┘

┌─────────────────────────────┬──────────────────────────────┐

│                             │                              │

│ REPORTS / HISTORY           │ UPCOMING / NEXT ACTION       │

│                             │                              │

└─────────────────────────────┴──────────────────────────────┘

┌────────────────────────────────────────────────────────────┐

│ AI / SMART INSIGHT                                         │

└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐

│ ACTIVE PATH / PERSONALIZED SUGGESTIONS                     │

└────────────────────────────────────────────────────────────┘

This is only a structural guide.

Do not make the final interface look like a wireframe.

Create a polished visual composition with asymmetrical card sizes, whitespace, depth and hierarchy.

4. HEADER

Create a clean top header.

Left side:

circular user avatar

personalized greeting

Hello, Sara 👋

How are you feeling today?

Make the greeting friendly and prominent.

Right side on desktop:

Dashboard

Statistics

Sessions

Support

Dashboard should be the active tab.

On mobile, convert this into a hamburger/menu interaction using JavaScript.

5. TOP STAT ROW

Create exactly three primary metric cards.

Card 1

Mood Score

65%

Stable

Include a circular or partial progress indicator.

Also show a small comparison such as:

+4% from last week

Card 2

Stress Level

70%

Moderate

Include a horizontal or circular indicator.

Show a small trend:

↓ 3% calmer

Card 3

Sleep Wellness

42 min

Average

Alternatively, this card can represent:

Streak

7 days

Active

Structure the JavaScript data so this can easily be changed later.

6. MAIN VISUAL CENTERPIECE — 3D BRAIN

This is one of the most important elements.

Place a large glossy 3D brain as the main visual centerpiece of the dashboard.

The brain should be visually similar to the brain shown in the second reference image:

realistic 3D appearance

glossy surface

detailed brain folds

luminous highlights

soft ambient glow

premium futuristic/wellness aesthetic

Do not use a different object.

It must be a brain.

Do not replace it with:

a sun

an orb

a person

a heart

abstract blobs

clouds

a generic medical icon

The brain should be presented as a wellness/emotional intelligence visualization, not a medical anatomy diagram.

7. BRAIN COLOR TREATMENT

The second reference image uses purple/lavender lighting.

Do not use purple/lavender in the final dashboard.

Reinterpret the brain lighting using:

Deep Teal → Ocean Teal → Sunset Gold → Warm Coral

The brain should retain its glossy 3D character while visually belonging to the new brand.

If the actual brain asset is supplied in the project, use that asset.

If an image asset needs to be added, create a clearly labelled:

assets/brain.png

placeholder/reference location so it can easily be replaced with the final brain image.

Do not substitute the brain with a CSS illustration.

8. WEEKLY MOOD WAVE

Create a dedicated trend panel titled:

Weekly Mood Wave

Subtitle:

Your emotional pattern over the past 7 days

Display:

Mon  Tue  Wed  Thu  Fri  Sat  Sun

Create a smooth animated line/sparkline chart.

Example data:

Mon 62

Tue 68

Wed 64

Thu 76

Fri 88

Sat 79

Sun 84

Use JavaScript to generate the chart.

The chart should have:

smooth curve

subtle area fill

circular data points

highlighted highest point

responsive width

subtle entrance animation

Do not make it look like a complex financial chart.

It should look soft and wellness-oriented.

9. MOOD-MIX BAR

Within the trend/analytics area, add:

Mood Mix

Show the proportion of emotional states:

Energized   30%

Calm        40%

Stressed    15%

Low         15%

Represent this using a horizontal segmented bar.

Use the brand colors:

Energized → Sunset Gold

Calm → Ocean Teal

Stressed → Warm Coral

Low → Mountain Brown / muted tone

Include a small legend.

The colors must remain accessible and visually harmonious.

10. REPORTS / QUESTIONNAIRE HISTORY

Create a Reports / History section.

This section represents previous questionnaire/check-in activity.

Example rows:

Emotional Check-in

Today · Completed                         >

Stress Management

Yesterday · Completed                     >

Sleep Tracking

Aug 31 · Completed                        >

Mood Reflection

Aug 30 · Completed                        >

Every row should include:

emotion/activity icon

title

date

status/tag

chevron

Add JavaScript interaction.

When a row is clicked, display additional information in a small expandable area or modal.

11. UPCOMING / NEXT ACTION CARD

Create a card titled:

Next Check-in

or:

Upcoming Session

Example:

Next check-in

06h 52m remaining

Emotional wellness reflection

Today · 4:30 PM

If a coach/therapist is used, include:

avatar

name

session type

Include a JavaScript countdown timer.

Make this card visually prominent but not dominant.

12. AI / SMART INSIGHT CARD

Create a dedicated Smart Insight card.

This is important because the application should visually communicate that questionnaire responses are being analyzed.

Header:

Your weekly insight

Add a small lightbulb or sparkle icon.

Example:

"Your mood tends to improve on days when you complete your evening reflection."

Another possible example:

"Your mood peaks on Thursdays. Consider scheduling a longer reflection session mid-week."

Add a small label:

AI-powered

Include a subtle CTA:

Start Evening Reflection

The card should feel intelligent but not overly futuristic.

Use gold/coral accents to distinguish it from ordinary cards.

13. ACTIVE PATH / PERSONALIZED SUGGESTIONS

Create an Active Path section.

This represents personalized activities based on the user's mood data.

Include:

Meditation

Journaling

Reflection

Breathing

Each suggestion should contain:

icon

title

short description or duration

optional progress indicator

Example:

🧘 Meditation

5 min · Calm your mind

✍ Journaling

10 min · Evening reflection

✨ Reflection

5 min · Understand today's mood

These should feel like actionable recommendations rather than another statistics list.

14. COLOR PALETTE

Use this exact brand palette throughout the dashboard:

:root {

  --deep-teal: #1C6E7E;

  --ocean-teal: #3FA6B8;

  --sunset-gold: #F2B84B;

  --warm-coral: #E89B6B;

  --charcoal: #2B2B2E;

  --sand-cream: #FBF3E3;

  --muted-sand: #D9CBA3;

  --mountain-brown: #8C7A5E;

}

Use:

#1C6E7E Deep Teal

primary buttons

active navigation

primary chart

important interactive elements

#3FA6B8 Ocean Teal

secondary accents

calm mood

icons

chart highlights

#F2B84B Sunset Gold

energized mood

selected states

insight highlights

progress indicators

#E89B6B Warm Coral

stressed mood

emotional warnings

secondary highlights

#2B2B2E Charcoal

primary text

headings

#FBF3E3 Sand Cream

primary page background

warm card surfaces

#D9CBA3 Muted Sand

borders

dividers

subtle backgrounds

#8C7A5E Mountain Brown

secondary text

metadata

low-priority information

15. IMPORTANT COLOR RULE

The final interface should contain no dominant purple or lavender.

The visual identity should immediately read as:

teal + sunset gold + warm coral + cream

The palette should feel warm and natural rather than neon.

16. CARDS AND VISUAL LANGUAGE

Use:

16–20px rounded corners

subtle borders

soft shadows

cream/white surfaces

generous padding

subtle gradients

smooth hover transitions

Avoid excessive glassmorphism.

Avoid excessive shadows.

Avoid making every card look identical.

Create a visual hierarchy where:

brain = main visual centerpiece

weekly mood wave = main analytical component

smart insight = main intelligent/personalized component

reports and suggestions = supporting components

17. ANIMATIONS

Use subtle animations only.

Include:

cards fade/slide in on page load

metric numbers animate upward

progress rings animate

mood chart draws itself

brain has a very subtle ambient glow/pulse

buttons have subtle hover transitions

insight card appears smoothly

Do not make the brain spin continuously.

Do not make the dashboard distracting.

18. JAVASCRIPT DATA ARCHITECTURE

Do not hard-code every value directly into the HTML.

Create a simple JavaScript data object such as:

const dashboardData = {

    user: {

        name: "Sara"

    },

    moodScore: 65,

    stressLevel: 70,

    sleepWellness: 42,

    moodTrend: [62, 68, 64, 76, 88, 79, 84],

    moodMix: {

        energized: 30,

        calm: 40,

        stressed: 15,

        low: 15

    }

};

Use this data to populate the UI.

This is important because the dashboard will eventually receive data from the questionnaire.

19. QUESTIONNAIRE CONNECTION — PREPARE FOR FUTURE DATA

The dashboard should be designed so it can eventually consume responses from the questionnaire screen.

Do not build the questionnaire now.

However, structure the JavaScript so these dashboard values can eventually come from questionnaire results:

moodScore

stressLevel

moodMix

moodTrend

streak

insight

recommendations

questionnaireHistory

The dashboard should therefore feel like the results/analytics destination of the emotion questionnaire.

20. RESPONSIVE DESIGN

Desktop should have a sophisticated multi-column layout.

Tablet should intelligently reduce the number of columns.

Mobile should become a clean single-column experience.

Mobile order:

Header

↓

Stats

↓

Brain

↓

Weekly Mood Wave

↓

Mood Mix

↓

Smart Insight

↓

Reports

↓

Next Check-in

↓

Active Path

No horizontal overflow.

Cards should resize naturally.

The brain should remain visually prominent on mobile without taking up the entire screen.

21. ACCESSIBILITY

Include:

semantic HTML

meaningful alt text

keyboard-accessible buttons

visible focus states

sufficient contrast

ARIA labels where appropriate

Do not rely solely on color to communicate mood states.

22. FINAL DESIGN INTENT

The final result should NOT look like a copy of either reference image.

Instead:

Reference Image 1 gives the general wellness-dashboard direction.

Reference Image 2 gives the desired style of the glossy 3D brain.

The requirements above define the actual dashboard.

Therefore the final product should be an original emotion-aware dashboard containing:

Personalized header

Desktop navigation

Three metric cards

Large glossy 3D brain

Weekly Mood Wave

Mood Mix visualization

Questionnaire/report history

Upcoming/next action card

AI-powered Smart Insight

Active Path / personalized suggestions

Use the sunset palette as the visual identity.

The brain should visually resemble the glossy 3D brain from the second reference, but it should be recolored with teal, gold and coral lighting.

Do not copy the second reference dashboard.

Do not reproduce its purple theme.

Do not create a generic dashboard.

Create a polished, original, responsive wellness dashboard that feels like a real product.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/48f2905e-0135-4819-8a85-a20101c8a6e9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Accounts and check-in database

The dashboard uses Supabase Auth (email/password) and a `wellness_checkins` table. Each saved row contains the user's selected answer for every question plus the calculated mood, stress, sleep, and mood-mix result.

1. Create a Supabase project and run [the migration](supabase/migrations/20260907_create_wellness_checkins.sql) in its SQL Editor.
2. In `public/dashboard/auth-config.js`, set the project URL and **anon/public** key from Supabase Settings → API. Never use a `service_role` key in a browser file.
3. In Supabase Auth, enable Email authentication and configure the site URL used for this app. If email confirmation is enabled, new users must confirm their email before signing in.

Row Level Security in the migration limits read and write access to the signed-in user, so one person's answers cannot be retrieved by another account.
