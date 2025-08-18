#!/usr/bin/env node
/*
 * Fails if any source file contains the banned API domain.
 
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const BANNED = /https?:\/\/api\.100acress\.com/gi;

/**
 * Recursively walk a directory and collect file paths.
 */
function walk(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full, acc);
    } else if (ent.isFile()) {
      acc.push(full);
    }
  }
  return acc;
}

function isSourceFile(p) {
  return /\.(js|jsx|ts|tsx)$/.test(p) && p.includes(path.sep + 'src' + path.sep);
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error('src directory not found:', SRC);
    process.exit(1);
  }

  const all = walk(ROOT).filter(isSourceFile);
  let violations = [];

  for (const file of all) {
    const content = fs.readFileSync(file, 'utf8');
    if (BANNED.test(content)) {
      // collect line numbers
      const lines = content.split(/\r?\n/);
      lines.forEach((line, idx) => {
        if (line.match(BANNED)) {
          violations.push(`${path.relative(ROOT, file)}:${idx + 1}: contains banned domain`);
        }
      });
    }
    BANNED.lastIndex = 0; // reset regex state if global
  }

  if (violations.length) {
    console.error('\nFound hardcoded API domain usage. Please use relative paths or centralized API base.');
    console.error('Banned pattern: https://api.100acress.com');
    console.error(violations.map(v => ' - ' + v).join('\n'));
    process.exit(2);
  } else {
    console.log('No banned API domain strings found.');
  }
}

main();
