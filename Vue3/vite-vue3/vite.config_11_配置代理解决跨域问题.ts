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
        configure: (proxy, options) => {
          // 自定义代理配置
          // console.log('自定义代理配置', proxy, options)
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // 打印到服务端，而不是浏览器控制台
            console.log('请求路径', req.url)
          })
          proxy.on('error', (err, req, res) => {
            console.log('代理错误', err)
          })
        },
      },
      '/api2': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        // 重写路径，将 /api2 替换为空字符串
        rewrite: (path) => path.replace(/^\/api2/, ''),
        secure: false,// 有些域名用 HTTPS，可能需要解决https证书问题
      },
      // 代理特定的 websocket 连接
      '/socket': {
        target: 'ws://localhost:8080',
        ws: true,
      }
    }
  }
})
