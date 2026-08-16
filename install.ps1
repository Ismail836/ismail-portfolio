# One-shot install for Windows (fixes esbuild postinstall + paths with spaces)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (Test-Path node_modules) {
  Write-Host "Removing old node_modules..."
  Remove-Item -Recurse -Force node_modules
}

Write-Host "npm install (scripts skipped via .npmrc)..."
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Setting up esbuild..."
npm run setup
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Done. Run: npm run dev"
