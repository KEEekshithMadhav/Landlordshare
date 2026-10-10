const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateAll() {
  const dir = path.join(__dirname, 'public', 'partners');
  const outDir = path.join(__dirname, 'public', 'partners_test');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const CANVAS_W = 360;
  const CANVAS_H = 160;

  const files = fs.readdirSync(dir).filter(f => !f.includes('backup'));
  
  for (const f of files) {
    const p = path.join(dir, f);
    try {
      const trimmedBuffer = await sharp(p).trim().toBuffer();
      const meta = await sharp(trimmedBuffer).metadata();
      const aspect = meta.width / meta.height;

      // Optical balance tuning based on aspect ratio & specific brand optical weight
      let targetW, targetH;
      const name = path.parse(f).name.toLowerCase();

      if (name.includes('srisreenivasa')) {
        targetW = 345;
        targetH = 65;
      } else if (name.includes('vasavi')) {
        targetW = 180;
        targetH = 126;
      } else if (name.includes('vajra')) {
        targetW = 180;
        targetH = 125;
      } else if (name.includes('prestige')) {
        targetW = 250;
        targetH = 112;
      } else if (aspect >= 3.8) {
        targetW = 330;
        targetH = 80;
      } else if (aspect >= 2.8) {
        targetW = 300;
        targetH = 90;
      } else if (aspect >= 1.8) {
        targetW = 260;
        targetH = 100;
      } else if (aspect >= 1.3) {
        targetW = 210;
        targetH = 110;
      } else {
        targetW = 160;
        targetH = 118;
      }

      const resized = await sharp(trimmedBuffer)
        .resize({
          width: targetW,
          height: targetH,
          fit: 'inside',
          withoutEnlargement: false
        })
        .toBuffer();

      const resizedMeta = await sharp(resized).metadata();
      const baseName = path.parse(f).name;

      await sharp({
        create: {
          width: CANVAS_W,
          height: CANVAS_H,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      })
      .composite([{ input: resized, gravity: 'center' }])
      .png()
      .toFile(path.join(outDir, baseName + '.png'));

      console.log(`OK: ${f} -> aspect: ${aspect.toFixed(2)}, size: ${resizedMeta.width}x${resizedMeta.height}`);
    } catch(e) {
      console.log(`ERR: ${f}: ${e.message}`);
    }
  }

  const testFiles = fs.readdirSync(outDir).filter(f => f.endsWith('.png'));
  const cardsHtml = testFiles.map(f => `
    <div class="item">
      <div class="card">
        <img src="${f}" alt="${f}" />
      </div>
      <div class="label">${f}</div>
    </div>
  `).join('\n');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Partner Logos Preview</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f1f5f9; padding: 40px; margin: 0; }
    h1 { color: #0f172a; margin-bottom: 24px; font-size: 24px; }
    .grid { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; }
    .card { background: white; border: 1px solid #cbd5e1; border-radius: 12px; width: 170px; height: 76px; display: flex; align-items: center; justify-content: center; padding: 8px 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
    .card img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .label { font-size: 11px; color: #64748b; text-align: center; margin-top: 6px; }
    .item { display: flex; flex-direction: column; align-items: center; }
  </style>
</head>
<body>
  <h1>Unified Partner Logos Size Preview (170x76 Card)</h1>
  <div class="grid">
    ${cardsHtml}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log('Done! Generated index.html preview');
}

generateAll();
