import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'build',
  format: ['esm'],
  bundle: false,
  splitting: false,
  target: 'es2022',
  sourcemap: true,
  clean: true
})
