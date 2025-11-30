import { createApp } from 'vue'
import App from '@/App.vue'
import '@/style/reset.scss'
import HospitalTop from '@/components/hospital_top/index.vue'

const app = createApp(App);
// 全局注册组件
app.component('HospitalTop', HospitalTop);
app.mount('#app')
