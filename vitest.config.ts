import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    environment: 'jsdom',
    css: true,
    setupFiles: ['./src/test/vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    globals: true, // describe, it, expect をグローバルで使用可能に
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
