import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
// 引入插件
import basePlugin from './plugins/basePlugin'
import mathPlugin from './plugins/mathPlugin'
// 安装插件，传入配置选项
Vue.use(basePlugin, {useMixin: true})
Vue.use(mathPlugin)
// 多次安装只会注册一次该插件
// Vue.use(mathPlugin)

new Vue({
  render: h => h(App)
}).$mount('#app')