// build.js - Script de build para produção
const fs = require("fs-extra");
const path = require("path");
const { minify } = require("terser");
const cssnano = require("cssnano");
const htmlMinifier = require("html-minifier");

const config = {
  src: "./src",
  dist: "./dist",
  css: {
    files: [
      "style.css",
      "layout.css",
      "components.css",
      "responsive.css",
      "high-contrast.css",
      "dark-mode.css",
    ],
  },
  js: {
    files: [
      "app.js",
      "router.js",
      "templates.js",
      "a11y.js",
      "theme-manager.js",
    ],
  },
};

async function build() {
  console.log("🚀 Iniciando build de produção...");

  try {
    // Limpar diretório dist
    await fs.emptyDir(config.dist);

    // Processar HTML
    await processHTML();

    // Processar CSS
    await processCSS();

    // Processar JavaScript
    await processJS();

    // Copiar assets
    await copyAssets();

    // Copiar templates
    await copyTemplates();

    // Gerar sitemap
    await generateSitemap();

    console.log("✅ Build concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro no build:", error);
    process.exit(1);
  }
}

async function processHTML() {
  console.log("📄 Processando HTML...");

  const htmlFiles = await fs.readdir(config.src);

  for (const file of htmlFiles) {
    if (path.extname(file) === ".html") {
      let content = await fs.readFile(path.join(config.src, file), "utf8");

      // Minificar HTML
      content = htmlMinifier.minify(content, {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      });

      await fs.writeFile(path.join(config.dist, file), content);
    }
  }
}

async function processCSS() {
  console.log("🎨 Processando CSS...");

  let combinedCSS = "";

  for (const file of config.css.files) {
    const content = await fs.readFile(
      path.join(config.src, "assets/css", file),
      "utf8"
    );
    combinedCSS += content + "\n";
  }

  // Minificar CSS
  const result = await cssnano.process(combinedCSS, {
    from: undefined,
    preset: [
      "default",
      {
        discardComments: { removeAll: true },
      },
    ],
  });

  await fs.writeFile(
    path.join(config.dist, "assets/css/styles.min.css"),
    result.css
  );
}

async function processJS() {
  console.log("⚡ Processando JavaScript...");

  let combinedJS = "";

  for (const file of config.js.files) {
    const content = await fs.readFile(
      path.join(config.src, "assets/js", file),
      "utf8"
    );
    combinedJS += content + "\n";
  }

  // Minificar JavaScript
  const result = await minify(combinedJS, {
    compress: true,
    mangle: true,
    output: {
      comments: false,
    },
  });

  await fs.writeFile(
    path.join(config.dist, "assets/js/app.min.js"),
    result.code
  );
}

async function copyAssets() {
  console.log("📁 Copiando assets...");

  // Copiar imagens otimizadas
  await fs.copy(
    path.join(config.src, "assets/imagens/optimized"),
    path.join(config.dist, "assets/imagens")
  );

  // Copiar outros assets
  await fs.copy(
    path.join(config.src, "assets/fonts"),
    path.join(config.dist, "assets/fonts")
  );
}

async function copyTemplates() {
  console.log("📋 Copiando templates...");
  await fs.copy(
    path.join(config.src, "templates"),
    path.join(config.dist, "templates")
  );
}

async function generateSitemap() {
  console.log("🗺️ Gerando sitemap...");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://vidaverde.org/</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://vidaverde.org/projetos</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://vidaverde.org/cadastro</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
</urlset>`;

  await fs.writeFile(path.join(config.dist, "sitemap.xml"), sitemap);
}

build();
