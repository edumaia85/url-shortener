import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'build',
  format: ['cjs'],
  bundle: false,
  splitting: false,
  clean: true,
  sourcemap: true,
  target: 'es2022',
  dts: false 
})
