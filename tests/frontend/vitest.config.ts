import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['<rootDir>/tests/frontend/setup.ts'],
    include: ['<rootDir>/tests/frontend/**/*.spec.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: '<rootDir>/coverage/frontend',
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    mockReset: true,
    restoreMocks: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../source/frontend/src'),
    },
  },
});