#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Analyze potential main-thread blocking issues
function analyzeMainThreadBlocking() {
  console.log('🔍 Analyzing Main-Thread Blocking Issues...');
  console.log('==========================================\n');
  
  const issues = [];
  const recommendations = [];
  
  // Check for heavy imports
  function checkHeavyImports(dir, depth = 0) {
    if (depth > 3) return; // Limit depth to avoid infinite recursion
    
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        checkHeavyImports(fullPath, depth + 1);
      } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Check for synchronous operations
        if (content.includes('require(') || content.includes('import_sync')) {
          issues.push({
            file: path.relative(process.cwd(), fullPath),
            type: 'Synchronous Import',
            severity: 'high'
          });
        }
        
        // Check for heavy computations in render
        if (content.includes('useMemo') === false && content.includes('useState') && content.includes('map(')) {
          const hasHeavyMap = content.match(/\.map\([^)]*\{[\s\S]*?filter\(|\.map\([^)]*\{[\s\S]*?sort\(/);
          if (hasHeavyMap) {
            issues.push({
              file: path.relative(process.cwd(), fullPath),
              type: 'Heavy Map Operation in Render',
              severity: 'medium'
            });
          }
        }
        
        // Check for large JSON imports
        const jsonImports = content.match(/import.*from\s+['"]\.\/.*\.json['"]/g);
        if (jsonImports) {
          jsonImports.forEach(match => {
            const jsonFile = match.match(/from\s+['"]([^'"]+)['"]/)[1];
            const jsonPath = path.resolve(path.dirname(fullPath), jsonFile);
            if (fs.existsSync(jsonPath)) {
              const jsonStat = fs.statSync(jsonPath);
              if (jsonStat.size > 50000) { // 50KB
                issues.push({
                  file: path.relative(process.cwd(), fullPath),
                  type: `Large JSON Import (${(jsonStat.size/1024).toFixed(1)}KB)`,
                  severity: 'high'
                });
              }
            }
          });
        }
        
        // Check for useEffect without dependencies
        const useEffectWithoutDeps = content.match(/useEffect\(\s*\(\)\s*=>\s*\{[\s\S]*?\},?\s*\[\s*\]/g);
        if (useEffectWithoutDeps) {
          issues.push({
            file: path.relative(process.cwd(), fullPath),
            type: 'useEffect without dependencies (runs on every render)',
            severity: 'high'
          });
        }
      }
    }
  }
  
  checkHeavyImports('./src');
  
  // Generate recommendations
  if (issues.length > 0) {
    console.log('⚠️  Issues Found:\n');
    issues.forEach((issue, index) => {
      const icon = issue.severity === 'high' ? '🔴' : '🟡';
      console.log(`${icon} ${index + 1}. ${issue.type}`);
      console.log(`   File: ${issue.file}\n`);
    });
    
    console.log('\n💡 Recommendations:\n');
    console.log('1. Use React.memo() for expensive components');
    console.log('2. Implement useMemo() for expensive calculations');
    console.log('3. Use useCallback() for event handlers');
    console.log('4. Lazy load heavy JSON data');
    console.log('5. Split large components into smaller ones');
    console.log('6. Use Web Workers for heavy computations');
    console.log('7. Implement virtual scrolling for large lists');
    console.log('8. Use React.lazy() for code splitting');
    
    // Add specific recommendations based on issues
    const hasHeavyMap = issues.some(i => i.type.includes('Heavy Map'));
    const hasLargeJSON = issues.some(i => i.type.includes('Large JSON'));
    const hasUseEffect = issues.some(i => i.type.includes('useEffect'));
    
    if (hasHeavyMap) {
      recommendations.push('Implement useMemo() for map operations with filter/sort');
    }
    
    if (hasLargeJSON) {
      recommendations.push('Load large JSON files asynchronously with dynamic imports');
    }
    
    if (hasUseEffect) {
      recommendations.push('Add proper dependency arrays to useEffect hooks');
    }
  } else {
    console.log('✅ No obvious main-thread blocking issues found!');
  }
  
  return { issues, recommendations };
}

// Run analysis
const result = analyzeMainThreadBlocking();

// Save report
fs.writeFileSync('./main-thread-analysis.json', JSON.stringify(result, null, 2));
console.log('\n📄 Detailed report saved to: main-thread-analysis.json');
