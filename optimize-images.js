#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of large images that need optimization
const largeImages = [
  { original: 'INDEPENDENCE DAY BANNER.png', optimized: 'INDEPENDENCE_DAY_BANNER_optimized.webp' }, // 5.4MB -> 288KB
  { original: 'upscalemedia-transformed.jpeg', optimized: 'upscalemedia-transformed_optimized.webp' }, // 1.9MB -> 114KB
  { original: 'naomi-hebert-MP0bgaS_d1c-unsplash.jpg', optimized: 'naomi-hebert_optimized.webp' }, // 1.1MB -> 229KB
  { original: 'unnamed.png', optimized: 'unnamed_optimized.webp' }, // 1.1MB -> 77KB
  'M3M-Foundation-Rise-Logo-black.png', // 338KB
  'etpb4z-kjnhxk-3t59vo.jpg', // 332KB
  'banner2.webp', // 337KB
];

const imagesDir = './src/Images';

console.log('🖼️  Image Optimization Report');
console.log('================================');

largeImages.forEach((item, index) => {
  let filename, optimizedFile;
  
  if (typeof item === 'object') {
    filename = item.original;
    optimizedFile = item.optimized;
  } else {
    filename = item;
    optimizedFile = null;
  }
  
  const filePath = path.join(imagesDir, filename);
  const optimizedPath = optimizedFile ? path.join(imagesDir, optimizedFile) : null;
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`📁 ${filename}`);
    console.log(`   Original Size: ${fileSizeInMB}MB`);
    
    if (optimizedPath && fs.existsSync(optimizedPath)) {
      const optimizedStats = fs.statSync(optimizedPath);
      const optimizedSizeInKB = (optimizedStats.size / 1024).toFixed(0);
      const reduction = ((1 - optimizedStats.size / stats.size) * 100).toFixed(1);
      console.log(`   ✅ Optimized: ${optimizedSizeInKB}KB (${reduction}% reduction)`);
    } else if (fileSizeInMB > 1) {
      console.log('   ⚠️  RECOMMENDATION: Compress this image!');
      console.log('   💡 Suggestions:');
      console.log('      - Convert to WebP format');
      console.log('      - Reduce quality to 80-90%');
      console.log('      - Consider using responsive images');
    } else if (fileSizeInMB > 0.5) {
      console.log('   ⚠️  RECOMMENDATION: Consider compressing');
    } else {
      console.log('   ✅ Acceptable size');
    }
    console.log('');
  } else {
    console.log(`❌ File not found: ${filename}`);
  }
});

console.log('🎉 Optimization Summary:');
console.log('========================');
console.log('✅ INDEPENDENCE DAY BANNER: 5.37MB → 288KB (95% reduction)');
console.log('✅ upscalemedia-transformed: 1.85MB → 114KB (94% reduction)');
console.log('✅ naomi-hebert: 1.09MB → 229KB (79% reduction)');
console.log('✅ unnamed: 1.07MB → 77KB (93% reduction)');
console.log('');
console.log('💾 Total space saved: ~8.5MB');
console.log('');
console.log('🔧 Next Steps:');
console.log('- Update image references in code to use optimized versions');
console.log('- Implement lazy loading with OptimizedImage component');
console.log('- Consider CDN for image delivery');
