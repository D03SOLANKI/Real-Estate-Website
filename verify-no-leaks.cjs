const fs = require('fs');
const path = require('path');

const searchTerms = [
  'era-residence',
  'eraresidence',
  'era residence',
  'estepona',
  'málaga',
  'malaga',
  'costa del sol',
  '+34',
  '655408648',
  '655 408',
  'thefirstthelast',
  'unreal estate',
  'swiss technology',
  'envy maison'
];

const directoriesToSearch = [
  path.join(__dirname, 'src'),
  path.join(__dirname, 'public'),
  path.join(__dirname, 'dist')
];

const filesToSearch = [
  path.join(__dirname, 'index.html'),
  path.join(__dirname, 'package.json'),
  path.join(__dirname, 'vite.config.js')
];

let totalFilesChecked = 0;
let leaksFound = [];

function scanFile(filePath) {
  // skip non-text or binary files
  const ext = path.extname(filePath).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.ico'].includes(ext)) {
    return;
  }
  
  totalFilesChecked++;
  const content = fs.readFileSync(filePath, 'utf8').toLowerCase();

  searchTerms.forEach(term => {
    if (content.includes(term.toLowerCase())) {
      leaksFound.push({
        file: path.relative(__dirname, filePath),
        term: term
      });
    }
  });
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'rea-output'].includes(entry.name)) continue;
      walkDir(fullPath);
    } else {
      scanFile(fullPath);
    }
  }
}

directoriesToSearch.forEach(walkDir);
filesToSearch.forEach(f => {
  if (fs.existsSync(f)) scanFile(f);
});

console.log('==================================================');
console.log('IDENTITY LEAK AUDIT REPORT');
console.log('==================================================');
console.log(`Total files scanned: ${totalFilesChecked}`);
console.log(`Search terms checked (${searchTerms.length}):`, searchTerms.join(', '));

if (leaksFound.length === 0) {
  console.log('RESULT: 0 LEAKS FOUND. Clean audit PASSED!');
} else {
  console.error(`RESULT: ${leaksFound.length} LEAKS FOUND!`);
  leaksFound.forEach(l => console.error(` - Found "${l.term}" in ${l.file}`));
  process.exit(1);
}
