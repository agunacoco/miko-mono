import svgr from '@honkhonk/vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  build: {
    outDir: 'build',
  },
  plugins: [svgr(), react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@miko/share-types': path.resolve(__dirname, '../shareTypes'),
    },
  },
});
