#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get build directory from command line or use default
const buildDir = process.argv[2] || './build';

function analyzeBundle() {
  const jsDir = path.join(buildDir, 'js');
  if (!fs.existsSync(jsDir)) {
    console.error(`JavaScript directory not found: ${jsDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
  const analysis = [];
  let totalSize = 0;

  console.log('\n📊 Bundle Size Analysis');
  console.log('========================\n');

  files.forEach(file => {
    const filePath = path.join(jsDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    totalSize += stats.size;
    
    // Determine file type
    let type = 'Other';
    if (file.includes('vendor') || file.includes('node_modules')) type = 'Vendor';
    else if (file.includes('index') || file.includes('main')) type = 'Main';
    else if (file.includes('chunk')) type = 'Chunk';
    else if (file.includes('react')) type = 'React';
    else if (file.includes('animation') || file.includes('motion')) type = 'Animation';
    else if (file.includes('ui') || file.includes('antd')) type = 'UI';
    else if (file.includes('icon')) type = 'Icons';
    
    analysis.push({
      file,
      size: stats.size,
      sizeKB: parseFloat(sizeKB),
      sizeMB: parseFloat(sizeMB),
      type
    });
  });

  // Sort by size (largest first)
  analysis.sort((a, b) => b.size - a.size);

  // Display results
  console.log('📁 Individual Files:');
  console.log('---------------------');
  analysis.forEach(item => {
    const sizeStr = item.sizeMB > 1 ? `${item.sizeMB} MB` : `${item.sizeKB} KB`;
    const icon = getFileIcon(item.type);
    console.log(`${icon} ${item.file.padEnd(40)} ${sizeStr.padStart(10)} (${item.type})`);
  });

  console.log('\n📈 Summary by Type:');
  console.log('---------------------');
  const typeSummary = {};
  analysis.forEach(item => {
    if (!typeSummary[item.type]) {
      typeSummary[item.type] = { count: 0, size: 0 };
    }
    typeSummary[item.type].count++;
    typeSummary[item.type].size += item.size;
  });

  Object.entries(typeSummary).forEach(([type, data]) => {
    const sizeKB = (data.size / 1024).toFixed(2);
    const sizeMB = (data.size / (1024 * 1024)).toFixed(2);
    const sizeStr = data.size > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;
    console.log(`${getFileIcon(type)} ${type.padEnd(15)} ${data.count} files, ${sizeStr}`);
  });

  console.log('\n💰 Total Size:');
  console.log('--------------');
  const totalKB = (totalSize / 1024).toFixed(2);
  const totalMB = (totalSize / (1024 * 1024)).toFixed(2);
  console.log(`Total JavaScript: ${totalMB} MB (${totalKB} KB)`);

  // Recommendations
  console.log('\n💡 Optimization Recommendations:');
  console.log('----------------------------------');
  
  const largeFiles = analysis.filter(f => f.size > 200 * 1024); // > 200KB
  if (largeFiles.length > 0) {
    console.log('⚠️  Large files detected (>200KB):');
    largeFiles.forEach(file => {
      console.log(`   - ${file.file} (${file.sizeKB} KB)`);
    });
    console.log('   Consider code splitting or lazy loading these modules.');
  }

  if (typeSummary['Animation'] && typeSummary['Animation'].size > 100 * 1024) {
    console.log('🎬 Animation libraries are large. Consider lazy loading framer-motion.');
  }

  if (typeSummary['Icons'] && typeSummary['Icons'].size > 50 * 1024) {
    console.log('🎨 Icon libraries are large. Consider tree-shaking or using SVG icons.');
  }

  const gzippedSize = totalSize * 0.3; // Estimated gzipped size
  const gzippedMB = (gzippedSize / (1024 * 1024)).toFixed(2);
  console.log(`\n📦 Estimated gzipped size: ~${gzippedMB} MB`);
}

function getFileIcon(type) {
  const icons = {
    'Main': '🏠',
    'Vendor': '📦',
    'Chunk': '🧩',
    'React': '⚛️',
    'Animation': '🎬',
    'UI': '🎨',
    'Icons': '🎯',
    'Other': '📄'
  };
  return icons[type] || '📄';
}

analyzeBundle();
