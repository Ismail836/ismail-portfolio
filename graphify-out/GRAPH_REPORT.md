# Graph Report — Glass Brutalist Portfolio

> **For agents:** Read `graphify-out/graph.json` before editing this codebase. This report summarizes what exists, how pieces connect, and what changed recently.

**Generated:** 2026-05-19 (manual curation from source files)  
**Owner:** Muhammad Ismail — Comsats University Islamabad  
**Stack:** HTML · CSS · Vanilla JS · Node.js · Express · Nodemailer

---

## What This Project Is

A personal developer portfolio with a **glassmorphism / brutalist** aesthetic (dark background, electric lime `#dfff00` accent, frosted glass cards). It showcases Muhammad Ismail's work across web development, Java applications, and game development.

**Run it:**
```bash
npm install
cp .env.example .env   # fill in SMTP credentials
npm run dev            # http://localhost:4000
```

---

## Architecture

```
public/index.html  ──►  public/styles.css
        │
        └── app.js ──►  /api/projects ──►  public/projects.json
                 ├──►  /api/project-click ──►  clicks.log
                 └──►  /api/contact ──►  Nodemailer (SMTP)

server.js serves static files + all API routes
```

| Layer | Files | Role |
|-------|-------|------|
| Backend | `server.js` | Express server, 4 API routes, static file hosting, click analytics |
| Frontend | `public/index.html`, `styles.css`, `app.js` | Single-page UI, theme toggle, animations, forms |
| Data | `public/projects.json` | Project gallery content (edit this to add/remove projects) |
| Config | `.env.example` | PORT + email SMTP settings |
| Analytics | `clicks.log` | CSV click counts per project slug |

---

## API Endpoints

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/projects` | Returns project array from `projects.json` |
| POST | `/api/project-click` | Logs a click by project `slug` |
| POST | `/api/contact` | Sends email via Nodemailer (needs `.env`) |
| GET | `/api/analytics` | Returns aggregated click counts |

Frontend fallback: if `/api/projects` fails, `app.js` tries static `/projects.json` directly.

---

## Current Portfolio Projects

1. **Inventory Management System** — Java OOP app ([GitHub](https://github.com/Ismail836/Inventory-management-system))
2. **Eventful Cart** — Season-aware shopping web app ([Live](https://eventful-cart.vercel.app))

> README mentions 3 sample projects but `projects.json` currently has **2 entries**. Add more by editing `public/projects.json`.

---

## Frontend Features

- **Theme toggle** — dark/light via `body.theme-dark` / `body.theme-light`, persisted in `localStorage` key `portfolioTheme`
- **Page loader** — fake progress 0→100%, fades out with GSAP (graceful fallback without GSAP)
- **Hero parallax** — mouse-driven 3D tilt on `#heroCard`
- **Project gallery** — CSS Grid cards rendered from JSON, "Track" button logs clicks
- **Contact form** — posts to `/api/contact`, shows success/error inline

---

## Git History (3 commits)

| Commit | Message |
|--------|---------|
| `e024c78` | Initial glassmorphism portfolio with Node/Express backend |
| `adf28bd` | Add profile image to hero card |
| `dcb8c5c` | Fix style and loading problem *(latest)* |

---

## God Nodes

These are the highest-connectivity nodes — start here when exploring:

1. **Express Server** (`server.js`) — hub for all API routes, static serving, analytics
2. **Client App** (`public/app.js`) — hub for all frontend behavior and API calls
3. **Project Data** (`public/projects.json`) — content source for the gallery
4. **Portfolio Page** (`public/index.html`) — structural layout tying UI together

---

## Surprising Connections

- **Eventful Cart ↔ This Portfolio** — Eventful Cart appears as a showcased project but is a separate deployed app on Vercel; this repo is the portfolio site, not the Eventful Cart codebase.
- **Dual project loading path** — `app.js` has a resilience pattern: API first, static JSON fallback. Agents editing either `server.js` or `projects.json` should know both paths exist.
- **GSAP is optional** — animations degrade gracefully if the CDN script fails to load; loader and entrance effects still work (just less polished).

---

## Suggested Questions

1. How does the contact form email flow work end-to-end?
2. What happens if Nodemailer credentials are missing from `.env`?
3. How would I add a third project to the gallery?
4. Where is click analytics stored and how is it read back?
5. What changed in the latest "style and loading" fix commit?

---

## Agent Quick Reference

| Task | Edit these files |
|------|-----------------|
| Add/remove projects | `public/projects.json` |
| Change styling/theme | `public/styles.css`, theme classes in `index.html` |
| Change page content/copy | `public/index.html` |
| Add frontend behavior | `public/app.js` |
| Add API endpoint | `server.js` |
| Configure email | `.env` (from `.env.example`) |
| Change port | `.env` → `PORT` (default 4000) |

**Do not commit:** `.env`, `node_modules/`, `clicks.log`

---

## File Inventory

```
Portfolio/
├── server.js              # Express backend
├── package.json           # Dependencies: express, cors, dotenv, nodemailer
├── .env.example           # Email config template
├── README.md              # Setup instructions
├── clicks.log             # Analytics (runtime, gitignored ideally)
├── Ismail.png             # Profile/asset image
├── public/
│   ├── index.html         # Main page
│   ├── styles.css         # Glassmorphism styles
│   ├── app.js             # Client logic
│   └── projects.json      # Project gallery data
└── graphify-out/
    ├── graph.json         # ← Agent knowledge graph
    └── GRAPH_REPORT.md    # ← This file
```
