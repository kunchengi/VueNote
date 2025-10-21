// 该文件用于创建Vuex最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'
// 应用Vuex插件
Vue.use(Vuex)
// 引入模块
import userModule from './modules/user'
import calculateModule from './modules/calculate'
Vue.use(Vuex)
export default new Vuex.Store({
  // 导入模块
  modules: {
    user: userModule,
    calculate: calculateModule
  },
  // 根state
  state: {
    appName: 'Vuex Demo App'
  },
  // 根getters
  getters: {
    appInfo: state => `应用: ${state.appName}`
  }
})