# Glass Brutalist Portfolio

React + Vite frontend and Express API — glassmorphism portfolio with a schedule / life-tracking hub.

## Project structure

```
Portfolio/
├── client/                 # React app (Vite)
│   ├── public/             # Static assets (profile.jpg, etc.)
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/     # PageLoader, ThemeToggle
│   │   │   ├── home/       # Hero, Dashboard, Projects, Contact
│   │   │   ├── layout/     # Header, Footer
│   │   │   └── schedule/   # Timetable, Habits, BucketList
│   │   ├── context/        # ThemeContext
│   │   ├── hooks/          # useLocalStorage
│   │   ├── lib/schedule/   # Schedule constants & helpers
│   │   ├── pages/          # HomePage, SchedulePage
│   │   └── styles/         # global.css, schedule.css
│   └── vite.config.js
├── server/                 # Express API
│   ├── routes/             # /api/* handlers
│   ├── lib/                # click analytics
│   └── index.js
├── data/
│   ├── projects.json       # Portfolio projects (edit here)
│   └── clicks.log          # Analytics (auto-generated)
├── scripts/                # install helpers
└── dist/                   # Production build output
```

## Setup

```bash
npm install
node scripts/setup-esbuild.cjs
npm run dev
```

**One address for everything:** http://localhost:4000

| URL | Page |
|-----|------|
| http://localhost:4000/ | Portfolio home |
| http://localhost:4000/schedule | Timetable · Habits · Bucket (use bottom nav) |

Use the **Schedule** button on the dashboard, or the hero link — same host, React switches pages without reloading.

Windows path with spaces? See `.npmrc` — run `node scripts/setup-esbuild.cjs` after install, or `.\install.ps1`.

## Production

```bash
npm run build
npm start
```

Open http://localhost:4000

## Edit content

| What | Where |
|------|--------|
| Projects | `data/projects.json` |
| Schedule habits/bucket defaults | `client/src/lib/schedule/index.js` |
| Email | `.env` (from `.env.example`) |
