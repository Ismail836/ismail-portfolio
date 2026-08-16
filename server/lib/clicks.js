const fs = require('fs');
const { CLICKS } = require('../config');

function readClicks() {
  if (!fs.existsSync(CLICKS)) return {};
  return fs
    .readFileSync(CLICKS, 'utf8')
    .trim()
    .split('\n')
    .filter(Boolean)
    .reduce((acc, line) => {
      const [key, count] = line.split(',');
      acc[key] = Number(count);
      return acc;
    }, {});
}

function logClick(key) {
  const safeKey = String(key).replace(/[^a-zA-Z0-9_-]/g, '_');
  const current = readClicks();
  current[safeKey] = (current[safeKey] || 0) + 1;
  const csv = Object.entries(current)
    .map(([name, count]) => `${name},${count}`)
    .join('\n');
  fs.writeFile(CLICKS, csv, (err) => {
    if (err) console.error('Could not log click:', err);
  });
}

module.exports = { readClicks, logClick };
