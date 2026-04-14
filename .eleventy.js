const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("posts/images");
  eleventyConfig.addPassthroughCopy(".htaccess");
  eleventyConfig.addPassthroughCopy("CNAME");

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
