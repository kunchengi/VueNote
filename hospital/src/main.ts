import { createApp } from 'vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入element-plus中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from '@/App.vue'
import '@/style/reset.scss'
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalButtom from '@/components/hospital_buttom/index.vue'
import router from '@/router'

const app = createApp(App);
// 全局注册组件
app.component('HospitalTop', HospitalTop);
app.component('HospitalButtom', HospitalButtom);
// 挂载路由
app.use(router)
// 挂载element-plus
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
