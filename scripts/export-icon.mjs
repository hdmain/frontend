import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = path.join(root, "exports", "icon");
const pngDir = path.join(outRoot, "png");
const jpgDir = path.join(outRoot, "jpeg");

fs.mkdirSync(pngDir, { recursive: true });
fs.mkdirSync(jpgDir, { recursive: true });

let svg = fs.readFileSync(path.join(root, "icon.svg"), "utf8");
svg = svg
  .replace(/fill="#000000"/g, 'fill="#C4001A"')
  .replace(/width="[^"]*"/, 'width="473"')
  .replace(/height="[^"]*"/, 'height="412"');

const svgBuf = Buffer.from(svg);
const sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512, 1024];

for (const size of sizes) {
  const pad = Math.round(size * 0.08);
  const inner = size - pad * 2;
  const iw = inner;
  const ih = Math.round((inner * 412) / 473);

  const wolfPng = await sharp(svgBuf, { density: Math.max(300, size * 2) })
    .resize(iw, ih, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  // Square PNG (transparent)
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: wolfPng, gravity: "centre" }])
    .png()
    .toFile(path.join(pngDir, `alfahost-icon-${size}.png`));

  // Square JPEG (white background)
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([{ input: wolfPng, gravity: "centre" }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(jpgDir, `alfahost-icon-${size}.jpg`));

  // Natural aspect (width = size)
  const natH = Math.round((size * 412) / 473);
  await sharp(svgBuf, { density: Math.max(300, size * 2) })
    .resize(size, natH, { fit: "fill" })
    .png()
    .toFile(path.join(pngDir, `alfahost-icon-${size}w.png`));

  await sharp(svgBuf, { density: Math.max(300, size * 2) })
    .resize(size, natH, { fit: "fill" })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(jpgDir, `alfahost-icon-${size}w.jpg`));
}

console.log(`Exported to ${outRoot}`);
console.log("PNG:", fs.readdirSync(pngDir).length, "files");
console.log("JPEG:", fs.readdirSync(jpgDir).length, "files");
