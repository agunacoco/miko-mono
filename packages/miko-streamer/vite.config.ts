import svgr from '@honkhonk/vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// ts paths Error
// 패케지 명과 ts path를 동일하게해서 오류가 나와야하는 상황에서 에러가 안 나오게 됨
// ts paths는 bundler 시스템에 의존해서 ts 이외에도 추가 설정해줘야만함.

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
      // '@miko/share-types': path.resolve(__dirname, '../shareTypes'),
    },
  },
});
