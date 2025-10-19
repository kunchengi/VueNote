import Vue from 'vue'
import App from './App.vue'
// 引入store实例
import store from './store'

Vue.config.productionTip = false
new Vue({
  // 挂载store实例
  store,
  render: h => h(App)
}).$mount('#app')// 挂载到app元素上
