#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  srcDir: './100acressFront/src',
  outputDir: './100acressFront/build',
  cssDir: './100acressFront/src/styles',
  // Commonly used selectors that should be kept
  keepSelectors: [
    // Layout
    'html', 'body', '#root', '.container', '.wrapper',
    // Typography
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button',
    // Common utilities
    '.text-center', '.text-left', '.text-right',
    '.hidden', '.show', '.visible', '.invisible',
    '.flex', '.block', '.inline', '.inline-block',
    // Bootstrap-like grid
    '.row', '.col', '.col-.*', '.offset-.*',
    // Common states
    ':hover', ':focus', ':active', ':disabled',
    '.hover:.*', '.focus:.*',
    // Animation classes
    '.animate', '.transition', '.fade',
    // Responsive utilities
    '.mobile', '.desktop', '.tablet',
    '@media', '@keyframes',
    // Component-specific critical classes
    '.navbar', '.nav-', '.hero-', '.btn-', '.card-',
    '.modal', '.dropdown', '.form-', '.input-',
    '.loading', '.spinner', '.skeleton'
  ]
};

function findUsedSelectors() {
  console.log('🔍 Scanning for used CSS selectors...');
  
  const usedSelectors = new Set();
  const jsFiles = [];
  
  // Find all JS/JSX files
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
        jsFiles.push(fullPath);
      }
    }
  }
  
  scanDirectory(config.srcDir);
  
  // Extract class names and IDs from JS files
  for (const file of jsFiles) {
    const content = fs.readFileSync(file, 'utf8');
    
    // Find className attributes
    const classNameMatches = content.match(/className=["'`]([^"'`]+)["'`]/g);
    if (classNameMatches) {
      for (const match of classNameMatches) {
        const classes = match.match(/className=["'`]([^"'`]+)["'`]/)[1];
        classes.split(/\s+/).forEach(cls => {
          if (cls.trim()) {
            usedSelectors.add(`.${cls.trim()}`);
          }
        });
      }
    }
    
    // Find ID attributes
    const idMatches = content.match(/id=["'`]([^"'`]+)["'`]/g);
    if (idMatches) {
      for (const match of idMatches) {
        const id = match.match(/id=["'`]([^"'`]+)["'`]/)[1];
        usedSelectors.add(`#${id}`);
      }
    }
    
    // Find CSS-in-JS styled components
    const styledMatches = content.match(/styled\([a-zA-Z]+\)`[`'"]([`'"]+)/g);
    if (styledMatches) {
      // Add styled component selectors (simplified)
      usedSelectors.add('[class*="styled"]');
    }
  }
  
  // Add keep selectors
  config.keepSelectors.forEach(selector => {
    usedSelectors.add(selector);
  });
  
  console.log(`✅ Found ${usedSelectors.size} unique selectors`);
  return usedSelectors;
}

function analyzeCSSFiles(usedSelectors) {
  console.log('\n📊 Analyzing CSS files...');
  
  const cssFiles = [];
  
  function findCSSFiles(dir) {
    try {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !file.startsWith('.' && file !== 'node_modules')) {
          findCSSFiles(fullPath);
        } else if (file.endsWith('.css')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          cssFiles.push({
            path: fullPath,
            name: file,
            size: content.length,
            content: content
          });
        }
      }
    } catch (e) {
      // Directory might not exist
    }
  }
  
  findCSSFiles(config.cssDir);
  
  // Sort by size (largest first)
  cssFiles.sort((a, b) => b.size - a.size);
  
  console.log('\n📁 CSS Files Analysis:');
  console.log('========================');
  
  let totalSize = 0;
  let totalUnused = 0;
  
  for (const file of cssFiles) {
    const { unused, unusedSize, usedSize } = analyzeUnusedCSS(file.content, usedSelectors);
    totalSize += file.size;
    totalUnused += unusedSize;
    
    const unusedPercent = ((unusedSize / file.size) * 100).toFixed(1);
    console.log(`📄 ${file.name}`);
    console.log(`   Size: ${(file.size / 1024).toFixed(1)} KB`);
    console.log(`   Unused: ${(unusedSize / 1024).toFixed(1)} KB (${unusedPercent}%)`);
    console.log('');
  }
  
  const totalUnusedPercent = ((totalUnused / totalSize) * 100).toFixed(1);
  console.log(`💰 Total CSS: ${(totalSize / 1024).toFixed(1)} KB`);
  console.log(`🗑️  Total Unused: ${(totalUnused / 1024).toFixed(1)} KB (${totalUnusedPercent}%)`);
  
  // Recommendations
  console.log('\n💡 Optimization Recommendations:');
  console.log('----------------------------------');
  
  if (totalUnusedPercent > 30) {
    console.log('⚠️  High amount of unused CSS detected. Consider:');
    console.log('   - Implementing CSS purging with PurgeCSS');
    console.log('   - Splitting CSS into critical and non-critical chunks');
    console.log('   - Using CSS modules for component-scoped styles');
  }
  
  const largeFiles = cssFiles.filter(f => f.size > 10 * 1024);
  if (largeFiles.length > 0) {
    console.log('📦 Large CSS files detected (>10KB):');
    largeFiles.forEach(file => {
      console.log(`   - ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    });
    console.log('   Consider splitting these files into smaller, focused modules.');
  }
  
  // Check for Font Awesome
  const fontAwesomeFile = cssFiles.find(f => f.name.includes('font-awesome') || f.name.includes('all.min'));
  if (fontAwesomeFile) {
    console.log('🎯 Font Awesome detected: Consider using tree-shaking or loading only needed icons.');
  }
}

function analyzeUnusedCSS(cssContent, usedSelectors) {
  const lines = cssContent.split('\n');
  let unused = '';
  let unusedSize = 0;
  let usedSize = 0;
  let inUnusedRule = false;
  let currentRule = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Skip comments and empty lines
    if (trimmedLine.startsWith('/*') || trimmedLine === '' || trimmedLine.startsWith('//')) {
      continue;
    }
    
    // Check if it's a selector line
    if (trimmedLine.includes('{') && !trimmedLine.startsWith('@')) {
      const selector = trimmedLine.split('{')[0].trim();
      currentRule = selector;
      
      // Check if selector is used
      const isUsed = isSelectorUsed(selector, usedSelectors);
      
      if (!isUsed) {
        inUnusedRule = true;
        unused += line + '\n';
        unusedSize += line.length;
      } else {
        inUnusedRule = false;
        usedSize += line.length;
      }
    } else if (inUnusedRule) {
      unused += line + '\n';
      unusedSize += line.length;
      
      if (trimmedLine === '}') {
        inUnusedRule = false;
      }
    } else {
      usedSize += line.length;
    }
  }
  
  return {
    unused,
    unusedSize,
    usedSize
  };
}

function isSelectorUsed(selector, usedSelectors) {
  // Remove pseudo-classes and pseudo-elements for comparison
  const cleanSelector = selector.replace(/:[^:]+/g, '').replace(/::[^:]+/g, '').trim();
  
  // Check exact match
  if (usedSelectors.has(cleanSelector)) {
    return true;
  }
  
  // Check partial matches for complex selectors
  for (const used of usedSelectors) {
    if (cleanSelector.includes(used) || used.includes(cleanSelector)) {
      return true;
    }
  }
  
  // Special cases for common patterns
  if (cleanSelector.startsWith('@media') || cleanSelector.startsWith('@keyframes')) {
    return true;
  }
  
  // Check for class patterns
  if (cleanSelector.startsWith('.')) {
    const className = cleanSelector.substring(1);
    for (const used of usedSelectors) {
      if (used.startsWith('.') && used.includes(className)) {
        return true;
      }
    }
  }
  
  return false;
}

// Main execution
console.log('🧹 CSS Usage Analyzer');
console.log('====================\n');

const usedSelectors = findUsedSelectors();
analyzeCSSFiles(usedSelectors);

console.log('\n✨ Analysis complete!');
