import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import falruiHtml from './build/html-plugin.js';

const pages = ['index', 'empresa/index', 'solucoes/index', 'projetos/index', 'qualidade/index', 'contactos/index', 'privacidade/index'];

export default defineConfig({
  plugins: [falruiHtml()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, resolve(import.meta.dirname, p + '.html')])),
    },
  },
});
