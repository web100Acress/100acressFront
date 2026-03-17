#!/usr/bin/env node

// Image Compression Script for 100acress.com
// Solves the 8.3MB image problem

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_SIZES = {
  thumbnail: { width: 300, height: 200, quality: 80 },
  medium: { width: 800, height: 600, quality: 85 },
  large: { width: 1200, height: 800, quality: 90 }, // FIXED: Proper resize dimensions
  hero: { width: 1920, height: 800, quality: 92 } // For hero images
};

const INPUT_DIR = './public/Images';
const OUTPUT_DIR = './public/Images-optimized';

async function compressImages() {
  console.log('🚀 Starting image compression for 100acress.com...');
  
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );

  console.log(`📊 Found ${imageFiles.length} images to compress`);

  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file);
    
    try {
      const metadata = await sharp(inputPath).metadata();
      const originalSize = fs.statSync(inputPath).size;
      
      console.log(`🖼️ Processing: ${file}`);
      console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB | ${metadata.width}x${metadata.height}`);

      // CRITICAL FIX: Don't upscale small images (as recommended)
      let targetSize = IMAGE_SIZES.large;
      
      // Only resize if image is larger than target dimensions
      if (metadata.width > 1200 || metadata.height > 800) {
        targetSize = IMAGE_SIZES.large; // 1200px max width
        console.log(`   🔄 Resizing large image: ${metadata.width}x${metadata.height} → max 1200px width`);
      } else if (metadata.width > 800 || metadata.height > 600) {
        targetSize = IMAGE_SIZES.medium; // 800px max width
        console.log(`   🔄 Resizing medium image: ${metadata.width}x${metadata.height} → max 800px width`);
      } else {
        // SMALL IMAGES: Don't resize, just compress
        console.log(`   📏 Small image (${metadata.width}x${metadata.height}): Only compressing, no resize`);
        targetSize = null;
      }
      
      // For hero images (like downtown skyline), use hero size but only if large enough
      if ((file.includes('downtown') || file.includes('skyline') || file.includes('hero')) && metadata.width > 1500) {
        targetSize = IMAGE_SIZES.hero;
        console.log(`   🎨 Using hero size for: ${file}`);
      }

      // CRITICAL FIX: Smart compression with aspect ratio preservation
      let compressedImage;
      
      if (targetSize) {
        console.log(`   📐 Resizing to: max ${targetSize.width}px width, Quality: ${targetSize.quality}%`);
        
        // Resize with aspect ratio preservation (FIXED)
        compressedImage = await sharp(inputPath)
          .resize({
            width: targetSize.width,
            withoutEnlargement: true, // CRITICAL: Don't upscale
            fit: 'inside' // Maintain aspect ratio
          })
          .webp({ 
            quality: targetSize.quality,
            effort: 6
          })
          .toBuffer();
      } else {
        // Small images: Only compress, no resize
        console.log(`   📦 Only compressing (no resize): Quality 80%`);
        compressedImage = await sharp(inputPath)
          .webp({ 
            quality: 80,
            effort: 6
          })
          .toBuffer();
      }
      
      // Write compressed image
      fs.writeFileSync(outputPath, compressedImage);
      const compressedSize = fs.statSync(outputPath).size;
      
      // CRITICAL FIX: If compression made it larger, use original
      if (compressedSize >= originalSize) {
        console.log(`   ⚠️  Compression increased size, using original`);
        fs.copyFileSync(inputPath, outputPath);
        const finalSize = fs.statSync(outputPath).size;
        const compressionRatio = ((originalSize - finalSize) / originalSize * 100).toFixed(1);
        
        console.log(`   Final: ${(finalSize / 1024 / 1024).toFixed(2)}MB | ${compressionRatio}% reduction (kept original)`);
        console.log(`   ✅ No size loss avoided\n`);
      } else {
        const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
        
        console.log(`   Compressed: ${(compressedSize / 1024 / 1024).toFixed(2)}MB | ${compressionRatio}% reduction`);
        console.log(`   ✅ Saved: ${((originalSize - compressedSize) / 1024 / 1024).toFixed(2)}MB\n`);
      }

    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  console.log('🎉 Image compression completed!');
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
  console.log('\n📋 Next steps:');
  console.log('1. Test optimized images');
  console.log('2. Replace original folder if satisfied');
  console.log('3. Upload to S3 for CDN');
}

// Check if sharp is installed
try {
  require('sharp');
  compressImages().catch(console.error);
} catch (error) {
  console.error('❌ Sharp not installed. Please run:');
  console.error('npm install sharp');
  process.exit(1);
}
