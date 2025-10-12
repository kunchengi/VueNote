// 引入精简版的vue，必须使用render函数
import Vue from 'vue'
// 引入完整版的vue，可以不使用render函数
// import Vue from 'vue/dist/vue'
import App from './App.vue'
//关闭vue的生产提示
Vue.config.productionTip = false
// 创建vue实例对象--vm
new Vue({
  // 完整版render写法
  // 传入的参数可创建具体元素
  // render(createElement){
  //   return createElement('h1','你好啊');
  // }
  // 精简版render写法
  // render:q => q('h1','你好啊')
  // 渲染App组件
  render: h => h(App),
  // 创建全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')// 挂载到app元素上
