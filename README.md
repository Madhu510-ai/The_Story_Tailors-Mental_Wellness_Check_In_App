# 🧘 Mindful — Emotion-Aware Mental Wellness & Story Recommendation Dashboard

A state-of-the-art mental wellness dashboard and story-based check-in application built with **TanStack Start**, **React 19**, **Vite**, **Tailwind CSS v4**, **Vanilla JS/HTML5**, and **Supabase Cloud**.

---

## 🌟 Executive Project Overview

The **Mindful Dashboard** application translates story-based user choices into quantitative psychological indicators (Mood Score, Stress Level, and Sleep Wellness). The platform dynamically adjusts its UI theme, ambient background videos, and action recommendations based on the user's emotional state.

### Key Capabilities & Architectural Features

1. **Emotion-Aware Dynamic Theme & Motion Background Engine**:
   - The user interface automatically shifts colors, typography highlights, and ambient background video loops across 7 mood states:
     - 🏔️ **Very Low Mood**
     - 🌧️ **Low Mood**
     - 🔮 **Uneasy Mood**
     - 🌿 **Good Mood**
     - ☀️ **Happy Mood**
     - 🔥 **Very Happy Mood**
     - ✨ **Euphoric Mood**

2. **Interactive Session Switcher & Test User Profiles**:
   - Provides instant profile switching between test user sessions across various mood baselines, allowing real-time previewing of dashboard themes and analytics.

3. **Multi-Genre Psychological Story Questionnaire**:
   - Offers interactive story check-ins across 12 distinct genres (*Detective & Mystery, Dark Romance, Fantasy & Magic, Sci-Fi, Psychological Thriller, Adventure, Drama, Horror, etc.*).
   - Ingests raw Excel (`.xlsx`) story spreadsheets and converts them into structured JSON question datasets with psychological scoring vectors.

4. **Analytics & Visualizations**:
   - **Mood Score**: Interactive SVG ring chart with weekly percentage delta.
   - **Stress Level**: Dynamic progress bar with stress reduction indicators.
   - **Sleep Wellness**: Sleep minutes tracker & streak counter.
   - **Weekly Mood Wave**: Timeline trend visualization.
   - **Session Visualizer**: Detailed breakdown of user responses to story questions.
   - **Personalized Recommendations**: Context-aware wellness activities (Meditation, Journaling, Reflection, Breathing).

5. **Cloud Synchronization & Supabase Authentication**:
   - Complete browser authentication module (Email/Password sign-up & login).
   - Syncs check-in results to a remote PostgreSQL table (`wellness_checkins`) protected with Row Level Security (RLS).

6. **TanStack Start Server-Side Framework**:
   - SSR application structure with custom `h3` server error normalization, Lovable runtime telemetry integration, global React error boundaries, and REST API endpoints.

---

## 📁 Directory Structure

```
mindful-dashboard/
├── public/                       # Static web server root & client SPA
│   ├── favicon.ico / robots.txt
│   └── dashboard/                # Main Wellness Dashboard Application
│       ├── assets/               # Avatars and ambient MP4 video loops
│       ├── data/                 # JSON datasets & XLSX source questionnaires
│       ├── index.html            # Main Dashboard UI view
│       ├── script.js             # Core Dashboard controller script
│       ├── checkin.html          # Interactive Questionnaire UI
│       ├── checkin.js            # Questionnaire logic & scoring engine
│       ├── login.html / login.js # Authentication view & login handler
│       ├── auth.js               # Supabase Auth & REST API client library
│       ├── auth-config.js        # Supabase project URL & key configuration
│       └── style.css             # Glassmorphism & dynamic mood design system
├── src/                          # TanStack Start SSR & React 19 Application
│   ├── components/ui/            # 46 shadcn/ui Tailwind components
│   ├── hooks/                    # Custom React hooks (e.g. useIsMobile)
│   ├── lib/                      # Error capture, HTML error page, Lovable reporting
│   ├── routes/                   # File-based routes & API handlers
│   │   ├── __root.tsx            # HTML shell, Head metadata, error boundary
│   │   ├── index.tsx             # Root route (redirects to /dashboard/login.html)
│   │   └── api/                  # Backend endpoints (/api/recommendations/...)
│   ├── routeTree.gen.ts          # Auto-generated TanStack router tree
│   ├── router.tsx                # Router instance & QueryClient provider setup
│   ├── server.ts                 # Custom SSR entry point & h3 error normalizer
│   ├── start.ts                  # Client bootstrap entry point
│   └── styles.css                # Global CSS directives & utility classes
├── scripts/                      # Data processing & build scripts
│   ├── import_all_questionnaires.cjs # Bulk XLSX to JSON conversion tool
│   ├── import_questionnaire.cjs     # Single spreadsheet importer
│   └── import_questionnaire.js      # ES module variant
├── supabase/                     # Database migrations & SQL schema
│   └── migrations/20260907_create_wellness_checkins.sql
├── vite.config.ts                # Vite & Lovable TanStack Start builder config
├── package.json                  # Dependencies & npm build scripts
└── README.md                     # Comprehensive project documentation
```

---

## 📄 File-by-File & Functionality Breakdown

### 1. Main Client Dashboard (`public/dashboard/`)

* [public/dashboard/index.html](file:///d:/projects/mindful-dashboard/public/dashboard/index.html)
  - **Functionality**: Main dashboard interface view.
  - **Key Components**: Holds 7 hidden `<video>` background loops, user session manager toolbar with demo mood profile buttons, key metrics cards (Mood Score ring, Stress Level bar, Sleep ring), Weekly Mood Wave timeline chart, Question Response Visualizer, and PDF/CSV export toolbar.

* [public/dashboard/script.js](file:///d:/projects/mindful-dashboard/public/dashboard/script.js)
  - **Functionality**: Main engine for dashboard rendering and stat computation (~1,500 lines).
  - **Exported / Key Functions**:
    - `getUsers()` / `getCurrentUser()` / `setCurrentUser(userId)`: User session management in `localStorage`.
    - `calculateMoodScore(history)` / `calculateStressLevel(history)` / `calculateSleepWellness(history)`: Statistical calculation algorithms.
    - `setMoodTheme(themeName)`: Swaps CSS custom variables and toggles active background video loops based on mood score.
    - `updateDashboard()`: Orchestrates re-renders, metric updates, and chart refresh.
    - `renderCharts()` / `renderSessionVisualizer()` / `renderRecommendations()`: UI component renderers.
    - `exportPDF()` / `exportCSV()` / `exportJSON()` / `exportSummary()`: Session reporting and file export functions.

* [public/dashboard/checkin.html](file:///d:/projects/mindful-dashboard/public/dashboard/checkin.html)
  - **Functionality**: Multi-step interactive story check-in questionnaire interface. Includes progress bar, genre grid, story selector dropdown, dynamic question step containers, and summary score overlay.

* [public/dashboard/checkin.js](file:///d:/projects/mindful-dashboard/public/dashboard/checkin.js)
  - **Functionality**: Questionnaire state machine & scoring engine.
  - **Exported / Key Functions**:
    - `loadQuestionnaireData()`: Fetches story question datasets (`genres.json` and `stories.json`).
    - `selectGenre(genreId)`: Filters available stories by selected genre.
    - `renderQuestion(index)`: Displays question steps and updates step progress bar.
    - `nextQuestion()` / `prevQuestion()`: Question navigation controls.
    - `calculateResults()`: Converts chosen options into Mood (%), Stress (%), and Sleep (minutes) score adjustments.
    - `submitCheckin()`: Saves session locally and syncs to Supabase.

* [public/dashboard/auth.js](file:///d:/projects/mindful-dashboard/public/dashboard/auth.js)
  - **Functionality**: Supabase Auth & REST API client (`window.WellnessAuth`).
  - **Exported Functions**:
    - `configured()`: Validates Supabase environment setup.
    - `session()` / `saveSession(data)` / `clearSession()`: Manages session storage tokens.
    - `signIn(email, password)`: Authenticates against `/auth/v1/token`.
    - `signUp(email, password, username)`: Registers user via `/auth/v1/signup`.
    - `getUser()`: Fetches user details with Bearer token authentication.
    - `signOut()`: Revokes token session.
    - `saveCheckin(checkin)`: Inserts check-in record into `/rest/v1/wellness_checkins`.
    - `loadCheckins()`: Queries user check-in history sorted by date.

* [public/dashboard/login.html](file:///d:/projects/mindful-dashboard/public/dashboard/login.html) & [public/dashboard/login.js](file:///d:/projects/mindful-dashboard/public/dashboard/login.js)
  - **Functionality**: Login and sign-up form view. Validates user credentials using `WellnessAuth` and handles guest demo bypass.

* [public/dashboard/style.css](file:///d:/projects/mindful-dashboard/public/dashboard/style.css)
  - **Functionality**: Comprehensive design system stylesheet (~100KB). Contains glassmorphic styling, mood-specific CSS theme variables, responsive layout grids, video background positioning, and CSS animations.

---

### 2. Server & SSR Architecture (`src/`)

* [src/server.ts](file:///d:/projects/mindful-dashboard/src/server.ts)
  - **Functionality**: Custom SSR entry point. Intercepts `h3` server errors, normalizes swallowed exceptions, and renders fallback error HTML.
  - **Key Functions**:
    - `getServerEntry()`: Loads `@tanstack/react-start/server-entry`.
    - `normalizeCatastrophicSsrResponse(response)`: Converts swallowed 500 JSON responses to human-friendly HTML pages.
    - `fetch(request, env, ctx)`: Server request handler.

* [src/lib/error-capture.ts](file:///d:/projects/mindful-dashboard/src/lib/error-capture.ts)
  - **Functionality**: Out-of-band error stack recorder.
  - **Key Functions**:
    - `describeError(error)`: Expands error cause chains into a clean string (up to 8,000 chars).
    - `consumeLastCapturedError()`: Retrieves and resets recorded errors within a 5-second TTL.

* [src/lib/error-page.ts](file:///d:/projects/mindful-dashboard/src/lib/error-page.ts)
  - **Functionality**: Standard 500 server error HTML template renderer (`renderErrorPage()`).

* [src/lib/lovable-error-reporting.ts](file:///d:/projects/mindful-dashboard/src/lib/lovable-error-reporting.ts)
  - **Functionality**: Error reporting integration for Lovable environment (`reportLovableError()`).

* [src/routes/__root.tsx](file:///d:/projects/mindful-dashboard/src/routes/__root.tsx)
  - **Functionality**: Root route component. Injects global stylesheets, sets meta tags, wraps layout with `QueryClientProvider`, and renders global 404 & error boundaries.

* [src/routes/index.tsx](file:///d:/projects/mindful-dashboard/src/routes/index.tsx)
  - **Functionality**: Root redirect handler (`/`) redirecting visitors to `/dashboard/login.html`.

* [src/routes/api/recommendations.$recommendationId.ts](file:///d:/projects/mindful-dashboard/src/routes/api/recommendations.$recommendationId.ts)
  - **Functionality**: GET API endpoint (`/api/recommendations/{id}`) returning authenticated user wellness recommendation instructions (Meditation, Journaling, Reflection, Breathing).

---

### 3. Data Processing Scripts (`scripts/`)

* [scripts/import_all_questionnaires.cjs](file:///d:/projects/mindful-dashboard/scripts/import_all_questionnaires.cjs)
  - **Functionality**: Ingestion script parsing 12 story questionnaire Excel spreadsheets (`.xlsx`) in `public/dashboard/data/questionnaire/` and merging them into `public/dashboard/data/stories.json` and `genres.json`.

---

### 4. Database Schema (`supabase/`)

* [supabase/migrations/20260907_create_wellness_checkins.sql](file:///d:/projects/mindful-dashboard/supabase/migrations/20260907_create_wellness_checkins.sql)
  - **Functionality**: Creates the `wellness_checkins` table in Supabase with RLS security policies restricting data read/write access strictly to authenticated account owners.

---

## 🚀 How to Run the Project

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *The server runs on Vite + TanStack Start. Access the application by visiting `http://localhost:5173`.*

3. **Import Questionnaire Data (Optional)**:
   ```bash
   npm run import-questions
   ```
