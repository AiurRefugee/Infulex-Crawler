import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/tmdb': {
        // 目标服务器，将请求转发到这个服务器
        target: 'https://api.themoviedb.org/3',
        // 改变原始请求的路径（把'/tmdb'替换为空），确保正确的请求路径
        rewrite: (path) => path.replace(/^\/tmdb/, ''),
        // 在请求头中的host字段使用目标服务器的host
        changeOrigin: true
      }
      
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
