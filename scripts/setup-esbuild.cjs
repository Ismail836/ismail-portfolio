const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const installScript = path.join(root, 'node_modules', 'esbuild', 'install.js');

if (!fs.existsSync(installScript)) {
  console.log('esbuild not in node_modules yet — skip (run after npm install).');
  process.exit(0);
}

console.log('Installing esbuild native binary (required for Vite)...');

try {
  execSync(`"${process.execPath}" "${installScript}"`, {
    cwd: root,
    stdio: 'inherit',
  });
  console.log('esbuild ready.');
} catch (err) {
  console.error('esbuild setup failed. Run manually:');
  console.error(`  node "${installScript}"`);
  process.exit(1);
}
