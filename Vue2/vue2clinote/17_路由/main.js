import Vue from 'vue'
import App from './App.vue'
// 引入全局样式
import './index.css'
// 引入路由实例
import router from './router'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // 挂载路由实例
  router
}).$mount('#app')// 挂载到app元素上
