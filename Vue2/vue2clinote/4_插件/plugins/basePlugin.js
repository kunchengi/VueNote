// 对象形式插件
import Hello from '../components/Hello.vue'
export default {
  install(Vue, options) {
    // 1. 添加全局方法或属性
    // 添加全局方法，使插件的方法在Vue直接使用
    Vue.dataUtils = {
      formatDate(date) {
        return new Date(date).toLocaleDateString()
      }
    }

    // 2. 添加全局指令
    Vue.directive('focus', {
      inserted(el) {
        el.focus()
      }
    })

    // 读取配置选项
    if(options && options.useMixin)
    {
      // 3. 添加全局mixin
      Vue.mixin({
        created() {
          console.log('全局Mixin created')
        }
      })
    }

    // 4. 添加实例方法，使插件的方法在Vue的实例中可用
    Vue.prototype.$dataUtils = Vue.dataUtils

    // 5. 添加全局组件
    Vue.component('Hello', Hello)
  }
}