/**
 * deploy.js — generic gh-pages replacement for Windows.
 *
 * Avoids the ENAMETOOLONG error that gh-pages triggers on Windows by using
 * `git add -A` instead of passing every filename as a CLI argument to git rm.
 *
 * Uses a PERSISTENT cache directory (.deploy-cache/<key>) so the remote repo
 * is only cloned once — subsequent deploys do a fast `git fetch` + reset
 * instead of re-downloading the entire repo every time.
 *
 * Usage (from package.json scripts):
 *   node scripts/deploy.js <branch> <remote-url>
 *
 * Example:
 *   "deploy:preview":  "node scripts/deploy.js live https://github.com/org/repo-preview.git"
 *   "deploy:official": "node scripts/deploy.js live https://github.com/org/repo-official.git"
 */

const { execSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

// ── Args ──────────────────────────────────────────────────────────────────────
const [,, BRANCH, REMOTE] = process.argv;

if (!BRANCH || !REMOTE) {
    console.error('Usage: node scripts/deploy.js <branch> <remote-url>');
    process.exit(1);
}

const ROOT      = path.resolve(__dirname, '..');
const BUILD_DIR = path.join(ROOT, 'build');

// Stable cache key: sanitise the remote URL so it's a safe directory name.
const cacheKey  = REMOTE.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_');
const CACHE_DIR = path.join(ROOT, '.deploy-cache', cacheKey);
// ─────────────────────────────────────────────────────────────────────────────

function exec(cmd, opts = {}) {
    console.log(`> ${cmd}`);
    execSync(cmd, { stdio: 'inherit', ...opts });
}

function copyDir(src, dest) {
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath  = path.join(src,  entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function hasChanges(cwd) {
    try {
        execSync('git diff --cached --quiet', { cwd });
        return false;
    } catch {
        return true;
    }
}

// ── Main ──────────────────────────────────────────────────────────────────────
if (!fs.existsSync(BUILD_DIR)) {
    console.error('❌  build/ directory not found. Run the build step first.');
    process.exit(1);
}

console.log(`\nDeploying to: ${REMOTE} (branch: ${BRANCH})`);
console.log(`Using cache dir: ${CACHE_DIR}\n`);

const cacheExists =
    fs.existsSync(CACHE_DIR) &&
    fs.existsSync(path.join(CACHE_DIR, '.git'));

if (cacheExists) {
    // ── Fast path: repo already cached — just fetch the latest ──────────────
    console.log('📦  Cache found — fetching latest instead of full clone…');
    try {
        exec(`git fetch origin ${BRANCH}`, { cwd: CACHE_DIR });
        exec(`git checkout ${BRANCH}`,     { cwd: CACHE_DIR });
        exec(`git reset --hard origin/${BRANCH}`, { cwd: CACHE_DIR });
    } catch {
        console.warn('⚠️  Fetch failed — wiping cache and doing a fresh clone.');
        fs.rmSync(CACHE_DIR, { recursive: true, force: true });
        cloneFresh();
    }
} else {
    cloneFresh();
}

function cloneFresh() {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    console.log('🌐  Cache empty — cloning (this only happens once)…');
    try {
        exec(`git clone --depth 1 --branch ${BRANCH} ${REMOTE} "${CACHE_DIR}"`);
    } catch {
        console.log(`Branch "${BRANCH}" not found — initialising fresh repo.`);
        exec(`git init "${CACHE_DIR}"`);
        exec(`git remote add origin ${REMOTE}`, { cwd: CACHE_DIR });
    }
}

// Wipe everything except .git so removed files get cleaned up.
for (const entry of fs.readdirSync(CACHE_DIR)) {
    if (entry === '.git') continue;
    fs.rmSync(path.join(CACHE_DIR, entry), { recursive: true, force: true });
}

// Copy the fresh build in.
console.log('\nCopying build files…');
copyDir(BUILD_DIR, CACHE_DIR);

// Stage everything (no file-list → no ENAMETOOLONG).
exec('git add -A', { cwd: CACHE_DIR });

if (!hasChanges(CACHE_DIR)) {
    console.log('\nℹ️  Nothing to deploy — already up to date.');
    process.exit(0);
}

exec('git commit -m "Deploy"', { cwd: CACHE_DIR });
exec(`git push origin HEAD:${BRANCH} --force`, { cwd: CACHE_DIR });

console.log('\n✅  Deployed successfully!');
