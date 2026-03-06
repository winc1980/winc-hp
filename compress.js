const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/masks/brushes');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

async function processImages() {
  for (const file of files) {
    const filePath = path.join(dir, file);
    const webpPath = filePath.replace('.png', '.webp');
    await sharp(filePath)
      .resize(800) // downscale
      .webp({ quality: 50 })
      .toFile(webpPath);
    console.log(`Converted ${file} to WebP`);
  }
}

processImages().catch(console.error);
