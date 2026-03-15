#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  srcDir: './src'
};

function fixImportPaths() {
  console.log('🔧 Fixing incorrect import paths...');
  
  let fixedFiles = 0;
  
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
    
    // Fix incorrect antdImports paths
    const incorrectPathRegex = /from ['"]\.\.\/\.\.\/utils\/antdImports['"]/g;
    
    if (incorrectPathRegex.test(content)) {
      // Calculate correct relative path
      const relativePath = path.relative(path.dirname(filePath), path.join(config.srcDir, 'utils', 'antdImports.js'));
      const importPath = relativePath.replace(/\.js$/, '');
      
      content = content.replace(incorrectPathRegex, `from '${importPath}'`);
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      fixedFiles++;
      console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
    }
  }
  
  processDirectory(config.srcDir);
  
  console.log('\n📊 Fix Summary:');
  console.log(`==================`);
  console.log(`Files fixed: ${fixedFiles}`);
  
  if (fixedFiles > 0) {
    console.log('\n✅ All import paths have been fixed!');
    console.log('Try running `npm run build` again.');
  } else {
    console.log('\n✅ All import paths are already correct!');
  }
}

// Run fix
fixImportPaths();
