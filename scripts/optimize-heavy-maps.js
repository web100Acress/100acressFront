#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Optimize heavy map operations
function optimizeHeavyMaps() {
  console.log('🚀 Optimizing Heavy Map Operations...');
  console.log('=====================================\n');
  
  let optimizedFiles = 0;
  let totalOptimizations = 0;
  
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
    let optimizationsInFile = 0;
    
    // Check if already has React imports
    const hasReactImport = content.includes('import React') || content.includes('import * as React');
    
    // Add necessary imports if not present
    if (!hasReactImport) {
      content = "import React, { useMemo } from 'react';\n" + content;
      modified = true;
    } else if (!content.includes('useMemo')) {
      content = content.replace(
        /import React[^;]*;/,
        'import React, { useMemo } from \'react\';'
      );
      modified = true;
    }
    
    // Pattern 1: .filter().map() chains
    const filterMapPattern = /(\w+)\.filter\(([^)]+)\)\.map\(([^)]+)\)/g;
    content = content.replace(filterMapPattern, (match, arrayName, filterFn, mapFn) => {
      modified = true;
      optimizationsInFile++;
      totalOptimizations++;
      
      return `useMemo(() => ${arrayName}.filter(${filterFn}).map(${mapFn}), [${arrayName}])`;
    });
    
    // Pattern 2: .sort().map() chains
    const sortMapPattern = /(\w+)\.sort\(([^)]+)\)\.map\(([^)]+)\)/g;
    content = content.replace(sortMapPattern, (match, arrayName, sortFn, mapFn) => {
      modified = true;
      optimizationsInFile++;
      totalOptimizations++;
      
      return `useMemo(() => [...${arrayName}].sort(${sortFn}).map(${mapFn}), [${arrayName}])`;
    });
    
    // Pattern 3: .filter().sort().map() chains
    const filterSortMapPattern = /(\w+)\.filter\(([^)]+)\)\.sort\(([^)]+)\)\.map\(([^)]+)\)/g;
    content = content.replace(filterSortMapPattern, (match, arrayName, filterFn, sortFn, mapFn) => {
      modified = true;
      optimizationsInFile++;
      totalOptimizations++;
      
      return `useMemo(() => ${arrayName}.filter(${filterFn}).sort(${sortFn}).map(${mapFn}), [${arrayName}])`;
    });
    
    // Pattern 4: Heavy map with object spread
    const heavyMapPattern = /\.map\(([^)]+=>\s*\{[^}]*\.\.\.[^}]*\})/g;
    content = content.replace(heavyMapPattern, (match, mapFn) => {
      // Only optimize if it's a complex map operation
      if (mapFn.includes('filter') || mapFn.includes('sort') || mapFn.includes('reduce')) {
        modified = true;
        optimizationsInFile++;
        totalOptimizations++;
        
        return `.map(${mapFn}) // TODO: Consider useMemo for this operation`;
      }
      return match;
    });
    
    // Add React.memo for components with heavy operations
    if (content.includes('.map(') && content.includes('return (') && !content.includes('React.memo')) {
      // Check if it's a functional component
      const componentMatch = content.match(/(?:const|function)\s+(\w+)\s*(?:=\s*\([^)]*\)\s*=>|\([^)]*\)\s*\{)/);
      if (componentMatch && !content.includes('export default')) {
        const componentName = componentMatch[1];
        
        // Add React.memo wrapper at the end of file
        if (content.includes(`export default ${componentName}`)) {
          content = content.replace(
            `export default ${componentName}`,
            `export default React.memo(${componentName})`
          );
          modified = true;
          optimizationsInFile++;
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      optimizedFiles++;
      console.log(`✅ Optimized: ${path.relative(process.cwd(), filePath)} (${optimizationsInFile} optimizations)`);
    }
  }
  
  processDirectory('./src');
  
  console.log('\n📊 Optimization Summary:');
  console.log(`========================`);
  console.log(`Files optimized: ${optimizedFiles}`);
  console.log(`Total optimizations: ${totalOptimizations}`);
  
  if (optimizedFiles > 0) {
    console.log('\n✅ Heavy map operations have been optimized!');
    console.log('💡 Review the changes and adjust dependency arrays as needed.');
  } else {
    console.log('\n✅ No heavy map operations found to optimize.');
  }
}

// Run optimization
optimizeHeavyMaps();
