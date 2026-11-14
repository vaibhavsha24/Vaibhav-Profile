import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig, type Plugin } from 'vite';

export default defineConfig(() => {
  const mdxRollup = mdx({
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'frontmatter' }],
      remarkGfm,
    ],
    providerImportSource: '@mdx-js/react',
  });

  const mdxPlugin: Plugin = {
    name: '@mdx-js/rollup-with-raw-skip',
    enforce: 'pre',
    config: mdxRollup.config,
    async transform(value, id) {
      if (id.includes('?raw')) return undefined;
      return (await mdxRollup.transform.call(this, value, id)) as any;
    },
  };

  return {
    base: process.env.VITE_BASE_PATH || '/',
    plugins: [mdxPlugin, react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
