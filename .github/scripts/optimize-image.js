// optimize-images.js - Otimização de imagens
const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

const config = {
  src: "./src/assets/imagens/original",
  dest: "./src/assets/imagens/optimized",
  formats: [
    { format: "webp", quality: 80 },
    { format: "jpg", quality: 75 },
    { format: "avif", quality: 60 },
  ],
  sizes: [
    { width: 1920, suffix: "-large" },
    { width: 1200, suffix: "-medium" },
    { width: 800, suffix: "-small" },
    { width: 400, suffix: "-thumbnail" },
  ],
};

async function optimizeImages() {
  console.log("🖼️ Iniciando otimização de imagens...");

  try {
    await fs.ensureDir(config.dest);
    const files = await fs.readdir(config.src);

    for (const file of files) {
      if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
        console.log(`Processando: ${file}`);
        await processImage(file);
      }
    }

    console.log("✅ Otimização de imagens concluída!");
  } catch (error) {
    console.error("❌ Erro na otimização:", error);
  }
}

async function processImage(filename) {
  const inputPath = path.join(config.src, filename);
  const nameWithoutExt = path.parse(filename).name;

  for (const size of config.sizes) {
    for (const format of config.formats) {
      const outputFilename = `${nameWithoutExt}${size.suffix}.${format.format}`;
      const outputPath = path.join(config.dest, outputFilename);

      try {
        let image = sharp(inputPath).resize(size.width, null, {
          withoutEnlargement: true,
        });

        switch (format.format) {
          case "webp":
            image = image.webp({ quality: format.quality });
            break;
          case "avif":
            image = image.avif({ quality: format.quality });
            break;
          default:
            image = image.jpeg({ quality: format.quality });
        }

        await image.toFile(outputPath);

        // Estatísticas
        const stats = await fs.stat(outputPath);
        const originalStats = await fs.stat(inputPath);
        const savings = (
          ((originalStats.size - stats.size) / originalStats.size) *
          100
        ).toFixed(1);

        console.log(
          `  ✅ ${outputFilename} (${(stats.size / 1024).toFixed(
            1
          )}KB) - ${savings}% menor`
        );
      } catch (error) {
        console.error(
          `  ❌ Erro ao processar ${outputFilename}:`,
          error.message
        );
      }
    }
  }
}

optimizeImages();
