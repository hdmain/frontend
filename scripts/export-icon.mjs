import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = path.join(root, "exports", "icon");
const pngDir = path.join(outRoot, "png");
const jpgDir = path.join(outRoot, "jpeg");
const appDir = path.join(root, "src", "app");
const publicDir = path.join(root, "public");

fs.mkdirSync(pngDir, { recursive: true });
fs.mkdirSync(jpgDir, { recursive: true });

let svg = fs.readFileSync(path.join(root, "icon.svg"), "utf8");
svg = svg
  .replace(/fill="#000000"/g, 'fill="#C4001A"')
  .replace(/width="[^"]*"/, 'width="473"')
  .replace(/height="[^"]*"/, 'height="412"');

const svgBuf = Buffer.from(svg);
const gMatch = svg.match(/<g[\s\S]*<\/g>/)?.[0] ?? "";

/** Crop opaque wolf from rasterized SVG. */
async function fullWolfPng() {
  const fullPng = await sharp(svgBuf, { density: 600 })
    .resize(2000, null, {
      fit: "inside",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .png()
    .toBuffer();

  const { data, info } = await sharp(fullPng)
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minX = info.width;
  let minY = info.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      if (data[i + 3] > 40 && data[i] > 40) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const edge = 4;
  minX = Math.max(0, minX - edge);
  minY = Math.max(0, minY - edge);
  maxX = Math.min(info.width - 1, maxX + edge);
  maxY = Math.min(info.height - 1, maxY + edge);

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  console.log(`Cropped wolf: ${width}x${height} from ${info.width}x${info.height}`);

  // Map raster crop back to original SVG viewBox units (473×412)
  const sx = 473 / info.width;
  const sy = 412 / info.height;
  const vbX = minX * sx;
  const vbY = minY * sy;
  const vbW = width * sx;
  const vbH = height * sy;
  // Square viewBox so favicon SVG fills the tab tile
  const side = Math.max(vbW, vbH) * 1.04;
  const cx = vbX + vbW / 2;
  const cy = vbY + vbH / 2;
  const squareVb = `${(cx - side / 2).toFixed(2)} ${(cy - side / 2).toFixed(2)} ${side.toFixed(2)} ${side.toFixed(2)}`;

  const cropped = await sharp(fullPng)
    .extract({ left: minX, top: minY, width, height })
    .png()
    .toBuffer();

  return { wolf: cropped, squareVb };
}

const { wolf, squareVb } = await fullWolfPng();
console.log(`Favicon SVG viewBox: ${squareVb}`);

const tightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${squareVb}" fill="#C4001A">
${gMatch}
</svg>
`;

const sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512, 1024];

/** Fit full wolf in square. padRatio: smaller = larger mark. */
async function fitSquare(size, format, padRatio = 0.06) {
  const inset = Math.max(1, Math.round(size * padRatio));
  const box = Math.max(1, size - inset * 2);

  const fitted = await sharp(wolf)
    .resize(box, box, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const canvas =
    format === "png"
      ? {
          width: size,
          height: size,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        }
      : {
          width: size,
          height: size,
          channels: 3,
          background: { r: 255, g: 255, b: 255 },
        };

  const pipeline = sharp({ create: canvas }).composite([
    { input: fitted, gravity: "centre" },
  ]);

  if (format === "png") return pipeline.png().toBuffer();
  return pipeline.jpeg({ quality: 94, mozjpeg: true }).toBuffer();
}

for (const size of sizes) {
  // Gallery exports — slightly larger mark
  await fs.promises.writeFile(
    path.join(pngDir, `alfahost-icon-${size}.png`),
    await fitSquare(size, "png", 0.05),
  );
  await fs.promises.writeFile(
    path.join(jpgDir, `alfahost-icon-${size}.jpg`),
    await fitSquare(size, "jpeg", 0.05),
  );

  const nat = await sharp(wolf)
    .resize(size, null, { fit: "inside" })
    .png()
    .toBuffer();
  await fs.promises.writeFile(
    path.join(pngDir, `alfahost-icon-${size}w.png`),
    nat,
  );
  await sharp(nat)
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 94, mozjpeg: true })
    .toFile(path.join(jpgDir, `alfahost-icon-${size}w.jpg`));
}

// Favicons: almost no padding so tab mark is bold/visible
const favPad = 0.02;
await fs.promises.writeFile(
  path.join(appDir, "icon.png"),
  await fitSquare(64, "png", favPad),
);
await fs.promises.writeFile(
  path.join(appDir, "apple-icon.png"),
  await fitSquare(180, "png", 0.04),
);
await fs.promises.writeFile(path.join(appDir, "icon.svg"), tightSvg);
await fs.promises.writeFile(path.join(publicDir, "icon.svg"), tightSvg);

await fs.promises.writeFile(
  path.join(publicDir, "apple-touch-icon.png"),
  await fitSquare(180, "png", 0.04),
);
await fs.promises.writeFile(
  path.join(publicDir, "icon-192.png"),
  await fitSquare(192, "png", favPad),
);
await fs.promises.writeFile(
  path.join(publicDir, "icon-512.png"),
  await fitSquare(512, "png", favPad),
);
await fs.promises.writeFile(
  path.join(publicDir, "favicon-16.png"),
  await fitSquare(16, "png", favPad),
);
await fs.promises.writeFile(
  path.join(publicDir, "favicon-32.png"),
  await fitSquare(32, "png", favPad),
);
await fs.promises.writeFile(
  path.join(publicDir, "favicon-48.png"),
  await fitSquare(48, "png", favPad),
);
await fs.promises.writeFile(
  path.join(publicDir, "favicon.ico"),
  await fitSquare(32, "png", favPad),
);

console.log(`Exported to ${outRoot}`);
console.log("Favicon SVG + PNGs maximized for browser tab");
