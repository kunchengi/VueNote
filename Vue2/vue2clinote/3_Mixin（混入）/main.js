import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 全局Mixin，在所有组件中都生效（慎用！）
Vue.mixin({
  created() {
    console.log('全局Mixin created')
  }
})
new Vue({
  render: h => h(App)
}).$mount('#app')// 挂载到app元素上
