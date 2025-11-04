console.log('🚀 Build iniciado...');

// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://tlocompro.cl',
  output: 'server',
  adapter: vercel(), // ✅ Esto ya no estará subrayado
  vite: {
    plugins: [tailwindcss()]
  }
});

/*
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
});
*/
