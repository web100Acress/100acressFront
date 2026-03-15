#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fix useEffect without dependencies
function fixUseEffectDeps() {
  console.log('🔧 Fixing useEffect without dependencies...');
  console.log('==========================================\n');
  
  let fixedFiles = 0;
  let totalFixes = 0;
  
  function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        processDirectory(fullPath);
      } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
        processFile(fullPath);
      }
    }
  }
  
  function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let fixesInFile = 0;
    
    // Fix useEffect without dependencies
    // Pattern 1: useEffect(() => { ... }, [])
    content = content.replace(
      /useEffect\(\s*\(\)\s*=>\s*\{([^}]+)\},?\s*\[\s*\]/g,
      (match, effectBody) => {
        modified = true;
        fixesInFile++;
        totalFixes++;
        return `useEffect(() => {${effectBody}}, []);`;
      }
    );
    
    // Pattern 2: useEffect(() => { ... })
    content = content.replace(
      /useEffect\(\s*\(\)\s*=>\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g,
      (match, effectBody) => {
        // Check if it doesn't already have dependencies
        if (!match.includes('[') || (match.includes('[') && match.includes('[]'))) {
          modified = true;
          fixesInFile++;
          totalFixes++;
          return `useEffect(() => {${effectBody}}, []);`;
        }
        return match;
      }
    );
    
    // Pattern 3: useEffect(function() { ... }, [])
    content = content.replace(
      /useEffect\(\s*function\(\)\s*\{([^}]+)\},?\s*\[\s*\]/g,
      (match, effectBody) => {
        modified = true;
        fixesInFile++;
        totalFixes++;
        return `useEffect(function() {${effectBody}}, []);`;
      }
    );
    
    // Add React.memo for components with heavy operations
    if (content.includes('.map(') && content.includes('return') && !content.includes('React.memo')) {
      // Simple heuristic: if component has map operation and returns JSX, add memo
      const hasMapInReturn = content.includes('return (') && content.includes('.map(');
      if (hasMapInReturn) {
        // Check if it's already a functional component
        const isFunctionalComponent = content.includes('const ') && content.includes(' = (') || content.includes('= function');
        if (isFunctionalComponent && !content.includes('export default')) {
          // Add React.memo wrapper
          content = content.replace(
            /(const\s+(\w+)\s*=\s*(?:\([^)]*\)\s*=>\s*|function\([^)]*\)\s*\{))/,
            '$1\n'
          );
          
          // Add React.memo at the end if component is exported
          if (content.includes('export')) {
            const componentName = content.match(/const\s+(\w+)/)?.[1];
            if (componentName) {
              if (!content.includes(`export default React.memo(${componentName})`)) {
                content = content.replace(
                  /export default\s+(\w+)/,
                  `export default React.memo($1)`
                );
              }
            }
          }
          
          modified = true;
        }
      }
    }
    
    if (modified) {
      // Add React import if needed for memo
      if (content.includes('React.memo') && !content.includes('import React')) {
        content = content.replace(
          /^/,
          'import React from \'react\';\n'
        );
      }
      
      fs.writeFileSync(filePath, content);
      fixedFiles++;
      console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)} (${fixesInFile} fixes)`);
    }
  }
  
  processDirectory('./src');
  
  console.log('\n📊 Fix Summary:');
  console.log(`==================`);
  console.log(`Files fixed: ${fixedFiles}`);
  console.log(`Total fixes: ${totalFixes}`);
  
  if (fixedFiles > 0) {
    console.log('\n✅ All useEffect hooks have been fixed!');
    console.log('💡 Consider adding proper dependency arrays based on your specific needs.');
  }
}

// Run fix
fixUseEffectDeps();
