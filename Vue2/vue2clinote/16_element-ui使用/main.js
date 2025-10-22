import Vue from 'vue'
import App from './App.vue'
import { Button, Select } from 'element-ui'
// 按需注册组件
Vue.use(Button)
Vue.use(Select)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')// 挂载到app元素上
