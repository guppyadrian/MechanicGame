import { defineConfig } from 'vite';

export default defineConfig({
  base: '/MechanicGame/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        nested: 'creator.html'
      },
    },
  },
});