const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  // Set path prefix for deployment
  // - Custom domain (production): / (default for bakers.sheshams.in)
  // - GitHub Pages project: /bakers/
  // - Subdirectory deployment: /subdirectory/
  const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || '/';
  
  // Ignore directories and files
  eleventyConfig.ignores.add(".github/**");
  eleventyConfig.ignores.add("sitemap.njk");  // Use static sitemap.xml instead
  
  // Passthrough copy for static assets
  // (These will be copied to _site and served correctly with pathPrefix)
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("posts/images");
  eleventyConfig.addPassthroughCopy("posts/instagram-feed.json");
  eleventyConfig.addPassthroughCopy(".htaccess");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");  // Static XML sitemap

  // Image optimization
  eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt) {
    if (!src) {
      throw new Error(`Missing \`src\` on myImage from: ${this.page.inputPath}`);
    }

    let metadata = await Image(src, {
      widths: [300, 600, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/assets/images/"
    });

    let imageAttributes = {
      alt,
      sizes: "(min-width: 1024px) 1024px, (min-width: 768px) 768px, 100vw",
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // Watch targets
  eleventyConfig.addWatchTarget("assets/**");

  // Collections
  eleventyConfig.addCollection("all", function(collection) {
    return collection.getFilteredByGlob("pages/**/*.md");
  });

  // Markdown
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let markdownLib = markdownIt(options)
    .use(markdownItAnchor);
  eleventyConfig.setLibrary("md", markdownLib);

  return {
    pathPrefix: pathPrefix,
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data"
    }
  };
};
