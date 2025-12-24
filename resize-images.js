import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "./public/collections/raw";
const OUTPUT_DIR = "./public/collections/web";
const OUTPUT_HQ_DIR = "./public/collections/web-hq";

// ===== WEB =====
const LANDSCAPE_WIDTH = 800;
const PORTRAIT_HEIGHT = 500;
const QUALITY = 85;

// ===== HQ =====
const HQ_LANDSCAPE_WIDTH = 1600;
const HQ_PORTRAIT_HEIGHT = 1000;
const HQ_QUALITY = 95;

[OUTPUT_DIR, OUTPUT_HQ_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const files = fs.readdirSync(INPUT_DIR);

(async () => {
  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file);
    const outputHQPath = path.join(OUTPUT_HQ_DIR, file);

    try {
      const image = sharp(inputPath);
      const meta = await image.metadata();

      const isLandscape =
        typeof meta.width === "number" &&
        typeof meta.height === "number" &&
        meta.width > meta.height;

      console.log(
        `${isLandscape ? "🖼️ Landscape" : "📸 Portrait"} → ${file}`
      );

      /* ========= WEB VERSION ========= */
      await image
        .clone()
        .resize(
          isLandscape
            ? { width: LANDSCAPE_WIDTH, fit: "inside" }
            : { height: PORTRAIT_HEIGHT, fit: "inside" }
        )
        .sharpen({
          sigma: 0.8,
          m1: 1,
          m2: 2,
        })
        .jpeg({
          quality: QUALITY,
          chromaSubsampling: "4:2:0",
          mozjpeg: true,
        })
        .toFile(outputPath);

      /* ========= HQ VERSION ========= */
      await image
        .clone()
        .resize(
          isLandscape
            ? { width: HQ_LANDSCAPE_WIDTH, fit: "inside" }
            : { height: HQ_PORTRAIT_HEIGHT, fit: "inside" }
        )
        .sharpen({
          sigma: 0.4, // nhẹ hơn để tránh gắt
        })
        .jpeg({
          quality: HQ_QUALITY,
          chromaSubsampling: "4:4:4",
          mozjpeg: true,
        })
        .toFile(outputHQPath);

    } catch (err) {
      console.error(`❌ Error with ${file}`, err);
    }
  }

  console.log("✅ DONE: Web + HQ images generated");
})();
