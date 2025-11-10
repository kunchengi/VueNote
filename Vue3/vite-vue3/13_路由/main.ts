import { createApp } from 'vue'
import App from '@/App.vue'
// 引入路由模块
import router from '@/router'
import '@/index.css'

// 创建Vue应用实例并使用路由
createApp(App).use(router).mount('#app')
