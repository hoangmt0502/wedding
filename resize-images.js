import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "./public/collections/raw";
const OUTPUT_DIR = "./public/collections/web";

const LANDSCAPE_WIDTH = 800; // ảnh ngang
const PORTRAIT_HEIGHT = 500; // ảnh dọc
const QUALITY = 100;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs.readdirSync(INPUT_DIR);

(async () => {
  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file);

    try {
      const image = sharp(inputPath);
      const meta = await image.metadata();

      const isLandscape = meta.width > meta.height;

      console.log(
        `${isLandscape ? "🖼️  Landscape" : "📸 Portrait"} → ${file}`
      );

      await image
      .resize(
        isLandscape
          ? { width: LANDSCAPE_WIDTH, fit: "inside" }
          : { height: PORTRAIT_HEIGHT, fit: "inside" }
      )
      .sharpen({
        sigma: 0.8,
        m1: 1,
        m2: 2,
        x1: 2,
        y2: 10,
        y3: 20,
      })
      .jpeg({
        quality: QUALITY,
        chromaSubsampling: "4:4:4",
        mozjpeg: true,
      })
      .toFile(outputPath);
    } catch (err) {
      console.error(`❌ Error with ${file}`, err);
    }
  }

  console.log("✅ DONE: All images resized correctly");
})();
