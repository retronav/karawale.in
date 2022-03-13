import shiki from 'shiki';
import { h } from 'hastscript';
const t = await shiki.loadTheme('./themes/ayu-dark.json');
const highlighter = await shiki.getHighlighter({ theme: t });
export default {
  // projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
  // pages: './src/pages', // Path to Astro components, pages, and data
  // dist: './dist',       // When running `astro build`, path to final static output
  // public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
  buildOptions: {
    site: 'https://obnerd.in', // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
    sitemap: true, // Generate sitemap (set to "false" to disable)
  },
  devOptions: {
    // hostname: 'localhost',  // The hostname to run the dev server on.
    // port: 3000,             // The port to run the dev server on.
  },
  renderers: ['@astrojs/renderer-svelte'],
  markdownOptions: {
    render: [
      '@astrojs/markdown-remark',
      {
        remarkPlugins: ['remark-gfm', 'remark-smartypants'],
        rehypePlugins: [
          'rehype-slug',
          ['@retronav/rehype-shiki', { highlighter }],
          [
            'rehype-autolink-headings',
            {
              behavior: 'append',
              content(node) {
                return h(
                  'span.icon.icon-link',
                  { ariaHidden: 'true' },
                  new Array(parseInt(node.tagName[1])).fill('#').join('')
                );
              },
            },
          ],
        ],
      },
    ],
  },
};
