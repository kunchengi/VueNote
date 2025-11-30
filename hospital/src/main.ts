import { createApp } from 'vue'
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
app.mount('#app')
