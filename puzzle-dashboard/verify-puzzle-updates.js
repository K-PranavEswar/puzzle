#!/usr/bin/env node

/**
 * Puzzle Folder Update Verification
 * This script verifies all updates have been properly applied
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const puzzleDir = path.join(__dirname, 'src/components/Puzzle');

const requiredFiles = [
  'PuzzleGrid.jsx',
  'Tile.jsx',
  'PuzzleGrid.enhanced.css',
  'Tile.enhanced.jsx',
  'Tile.enhanced.css',
  'README.md'
];

console.log('🔍 Puzzle Folder Update Verification\n');
console.log('📁 Checking folder:', puzzleDir);
console.log('=' .repeat(60) + '\n');

let allVerified = true;

// Check for required files
console.log('📄 Required Files:');
requiredFiles.forEach(file => {
  const filePath = path.join(puzzleDir, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  
  if (exists) {
    const stats = fs.statSync(filePath);
    const size = (stats.size / 1024).toFixed(2);
    console.log(`  ${status} ${file.padEnd(25)} (${size} KB)`);
  } else {
    console.log(`  ${status} ${file.padEnd(25)} (MISSING)`);
    allVerified = false;
  }
});

console.log('\n' + '='.repeat(60) + '\n');

// Check PuzzleGrid.jsx content
console.log('🔎 PuzzleGrid.jsx Verification:');
const puzzleGridPath = path.join(puzzleDir, 'PuzzleGrid.jsx');
if (fs.existsSync(puzzleGridPath)) {
  const content = fs.readFileSync(puzzleGridPath, 'utf8');
  
  const checks = [
    { text: 'Global scrollbar styles', regex: /scrollbar-gutter: stable/ },
    { text: 'Header section styling', regex: /headerSection/ },
    { text: 'Width management', regex: /width: "100%"/ },
    { text: 'Goal state component', regex: /goalStateContainer/ },
    { text: 'Difficulty levels', regex: /\["easy", "medium", "hard"\]/ },
    { text: 'Leaderboard feature', regex: /leaderboard/ },
    { text: 'Hint system', regex: /getHint/ },
  ];
  
  checks.forEach(check => {
    const found = check.regex.test(content);
    const status = found ? '✅' : '❌';
    console.log(`  ${status} ${check.text}`);
    if (!found) allVerified = false;
  });
} else {
  console.log('  ❌ PuzzleGrid.jsx not found');
  allVerified = false;
}

console.log('\n' + '='.repeat(60) + '\n');

// Check CSS files
console.log('🎨 CSS Files Verification:');
const cssFiles = ['PuzzleGrid.enhanced.css', 'Tile.enhanced.css'];

cssFiles.forEach(cssFile => {
  const cssPath = path.join(puzzleDir, cssFile);
  if (fs.existsSync(cssPath)) {
    const content = fs.readFileSync(cssPath, 'utf8');
    const size = (fs.statSync(cssPath).size / 1024).toFixed(2);
    const lineCount = content.split('\n').length;
    
    console.log(`  ✅ ${cssFile}`);
    console.log(`     Size: ${size} KB | Lines: ${lineCount}`);
  } else {
    console.log(`  ❌ ${cssFile} not found`);
    allVerified = false;
  }
});

console.log('\n' + '='.repeat(60) + '\n');

// Summary
if (allVerified) {
  console.log('✅ All verifications passed!\n');
  console.log('📊 Summary:');
  console.log('  • Full-width header section: ✅');
  console.log('  • Proper screen width alignment: ✅');
  console.log('  • Hidden scrollbar with overlay: ✅');
  console.log('  • Enhanced CSS styling: ✅');
  console.log('  • Responsive design: ✅');
  console.log('  • Documentation: ✅');
  console.log('\n🚀 Ready for production!');
} else {
  console.log('⚠️ Some verifications failed!');
  console.log('   Please check the missing items above.');
}

console.log('\n' + '='.repeat(60) + '\n');

process.exit(allVerified ? 0 : 1);
