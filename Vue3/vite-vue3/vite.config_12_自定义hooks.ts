import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入vite-plugin-vue-setup-extend插件
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueSetupExtend()],// 使用vue和vueSetupExtend插件
  server: {
    proxy: {
      '/api1': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // 重写路径，将 /api1 替换为空字符串
        rewrite: (path) => path.replace(/^\/api1/, ''),
      }
    }
  }
})
