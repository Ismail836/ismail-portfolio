const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const { PORT, DIST, ROOT } = require('./config');
const apiRoutes = require('./routes');

const isDev =
  process.env.NODE_ENV === 'development' ||
  process.env.npm_lifecycle_event === 'dev';

async function start() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/api', apiRoutes);

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      configFile: path.join(ROOT, 'client', 'vite.config.js'),
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('\n  Portfolio (dev) — one address for everything\n');
  } else if (fs.existsSync(DIST)) {
    app.use(express.static(DIST));
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.sendFile(path.join(DIST, 'index.html'));
    });
    console.log('\n  Portfolio (production)\n');
  } else {
    console.log('\n  API only — run npm run build then npm start for the UI\n');
  }

  app.listen(PORT, () => {
    console.log(`  Open: http://localhost:${PORT}`);
    console.log('    /          Home & dashboard');
    console.log('    /schedule  Timetable · Habits · Bucket (bottom nav)\n');
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
