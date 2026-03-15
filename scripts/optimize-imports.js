#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  srcDir: './src',
  antdImportMap: {
    'Button': 'antd/es/button',
    'Input': 'antd/es/input',
    'Modal': 'antd/es/modal',
    'message': 'antd/es/message',
    'Skeleton': 'antd/es/skeleton',
    'Card': 'antd/es/card',
    'Avatar': 'antd/es/avatar',
    'Select': 'antd/es/select',
    'Badge': 'antd/es/badge',
    'Empty': 'antd/es/empty',
    'Switch': 'antd/es/switch',
    'Tooltip': 'antd/es/tooltip',
    'Divider': 'antd/es/divider',
    'Dropdown': 'antd/es/dropdown',
    'Alert': 'antd/es/alert',
    'Collapse': 'antd/es/collapse',
    'ConfigProvider': 'antd/es/config-provider',
    'notification': 'antd/es/notification'
  }
};

function optimizeAntdImports() {
  console.log('🔧 Optimizing Ant Design imports...');
  
  let optimizedFiles = 0;
  let totalImports = 0;
  
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
    
    // Find antd imports
    const antdImportRegex = /import\s*\{([^}]+)\}\s*from\s*['"]antd['"];?/g;
    let match;
    
    while ((match = antdImportRegex.exec(content)) !== null) {
      const imports = match[1].split(',').map(s => s.trim());
      const optimizedImports = [];
      
      imports.forEach(imp => {
        // Handle default imports and destructuring
        const cleanImport = imp.replace(/.*as\s+/, '').trim();
        
        if (config.antdImportMap[cleanImport]) {
          optimizedImports.push(cleanImport);
          totalImports++;
        }
      });
      
      if (optimizedImports.length > 0) {
        // Calculate relative path to utils/antdImports.js
        const relativePath = path.relative(path.dirname(filePath), path.join(config.srcDir, 'utils', 'antdImports.js'));
        const importPath = relativePath.replace(/\.js$/, '');
        
        // Replace with optimized imports
        const newImports = optimizedImports
          .map(imp => `import { ${imp} } from '${importPath}';`)
          .join('\n');
        
        content = content.replace(match[0], newImports);
        modified = true;
      }
    }
    
    // Handle single antd imports
    const singleImportRegex = /import\s+(\w+)\s+from\s*['"]antd\/es\/(\w+)['"];?/g;
    
    while ((match = singleImportRegex.exec(content)) !== null) {
      const componentName = match[1];
      const modulePath = match[2];
      
      if (config.antdImportMap[componentName]) {
        // Calculate relative path to utils/antdImports.js
        const relativePath = path.relative(path.dirname(filePath), path.join(config.srcDir, 'utils', 'antdImports.js'));
        const importPath = relativePath.replace(/\.js$/, '');
        
        const newImport = `import { ${componentName} } from '${importPath}';`;
        content = content.replace(match[0], newImport);
        modified = true;
        totalImports++;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      optimizedFiles++;
      console.log(`✅ Optimized: ${path.relative(process.cwd(), filePath)}`);
    }
  }
  
  processDirectory(config.srcDir);
  
  console.log('\n📊 Optimization Summary:');
  console.log(`========================`);
  console.log(`Files optimized: ${optimizedFiles}`);
  console.log(`Total imports optimized: ${totalImports}`);
  
  if (optimizedFiles > 0) {
    console.log('\n💡 Next steps:');
    console.log('1. Run `npm run build` to see the impact');
    console.log('2. Check bundle size with `npm run analyze:bundle`');
    console.log('3. Test the application to ensure nothing broke');
  }
}

// Run optimization
optimizeAntdImports();
