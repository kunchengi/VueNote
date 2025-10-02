export default function mathPlugin(Vue, options) {
    // 添加全局方法，使插件的方法在Vue直接使用
    Vue.mathUtils = {
        add(a, b) {
            return a + b
        }
    }
    // 添加实例方法，使插件的方法在Vue的实例中可用
    Vue.prototype.$mathUtils = Vue.mathUtils
}