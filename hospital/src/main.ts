import { createApp } from 'vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入element-plus中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from '@/App.vue'
import '@/style/reset.scss'
import HosTop from '@/components/HosTop/index.vue'
import HosBottom from '@/components/HosBottom/index.vue'
import router from '@/router'
// 引入pinia
import pinia from '@/store'
// 引入登录组件
import HosLogin from '@/components/HosLogin/index.vue'

const app = createApp(App);
// 全局注册组件
app.component('HosTop', HosTop);
app.component('HosBottom', HosBottom);
// 全局注册登录组件
app.component('HosLogin', HosLogin);
// 挂载路由
app.use(router)
// 挂载element-plus
app.use(ElementPlus, {
  locale: zhCn,
})
// 挂载pinia
app.use(pinia)
app.mount('#app')
