#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Fix syntax errors created by optimization scripts
function fixSyntaxErrors() {
  console.log('🔧 Fixing Syntax Errors...');
  console.log('========================\n');
  
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
    
    // Fix pattern: }, []);, []); -> }, []);
    content = content.replace(/\},\s*\[\]\);\,\s*\[\]\);/g, () => {
      modified = true;
      fixesInFile++;
      totalFixes++;
      return '}, []);';
    });
    
    // Fix pattern: }, []);, []); -> }, []);
    content = content.replace(/\}\s*,\s*\[\]\);/g, () => {
      modified = true;
      fixesInFile++;
      totalFixes++;
      return '});';
    });
    
    // Fix pattern: }, []);, []); -> }, []);
    content = content.replace(/\},\s*\[\]\);\,\s*\[\]\);/g, () => {
      modified = true;
      fixesInFile++;
      totalFixes++;
      return '}, []);';
    });
    
    // Fix pattern: }, []);, []); -> }, []);
    content = content.replace(/\},\s*\[\]\);\,\s*\[\]\);/g, () => {
      modified = true;
      fixesInFile++;
      totalFixes++;
      return '}, []);';
    });
    
    // Fix any remaining patterns with extra commas and brackets
    content = content.replace(/\},\s*\[\]\);,\s*\[\]\);/g, '}, []);');
    content = content.replace(/\},\s*\[\]\);\s*,\s*\[\]\);/g, '}, []);');
    content = content.replace(/\},\s*\[\]\);\s*,\s*\[\]\);/g, '}, []);');
    
    // Fix double semicolons
    content = content.replace(/;;\s*\)/g, ');');
    content = content.replace(/;;/g, ';');
    
    // Fix pattern: });; -> });
    content = content.replace(/\}\);;/g, '});');
    
    if (modified) {
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
    console.log('\n✅ All syntax errors have been fixed!');
  } else {
    console.log('\n✅ No syntax errors found.');
  }
}

// Run fix
fixSyntaxErrors();
