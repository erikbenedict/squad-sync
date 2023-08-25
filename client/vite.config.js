import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import postcss from 'rollup-plugin-postcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // css: {
  //   preprocessorOptions: {
  //     // Add your main CSS file here
  //     // This assumes styles.css is in your project root
  //     // Adjust the path accordingly if it's in a different location
  //     import: './src/index.css',
  //   },
  // },
    server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
