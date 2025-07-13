import { defineConfig } from 'commandkit';

export default defineConfig({
  src: 'src', // The source directory of your project.
  main: 'index.js', // The JavaScript entry point of your project.
  outDir: 'dist', // The output directory of your project.
  antiCrash: true,
  sourcemap:true
});