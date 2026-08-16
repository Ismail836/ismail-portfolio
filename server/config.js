const path = require('path');

const ROOT = path.join(__dirname, '..');

module.exports = {
  ROOT,
  PORT: process.env.PORT || 4000,
  DIST: path.join(ROOT, 'dist'),
  DATA: path.join(ROOT, 'data'),
  PROJECTS: path.join(ROOT, 'data', 'projects.json'),
  CLICKS: path.join(ROOT, 'data', 'clicks.log'),
};
