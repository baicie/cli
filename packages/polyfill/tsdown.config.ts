import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: './src/index.ts',
  outDir: './dist',
  format: ['esm', 'cjs', 'iife', 'umd'],
  tsconfig: './tsconfig.json',
  sourcemap: true,
  clean: true,
  dts: true,
  outputOptions: {
    name: 'BaiciePolyfill',
  },
})
