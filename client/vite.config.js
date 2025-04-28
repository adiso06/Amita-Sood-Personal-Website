/** @type {import('vite').UserConfig} */
export default {
  plugins: [],
  resolve: {
    alias: {
      '@': '/src',
      '@shared': '../shared',
      '@assets': '../attached_assets',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
} 