// 该文件用于创建Vuex最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'
// 应用Vuex插件
Vue.use(Vuex)
// 引入模块
import userModule from './modules/user'
import calculateModule from './modules/calculate'
Vue.use(Vuex)

// 日志插件
const loggerPlugin = store => {
  // 监听所有mutations，每次mutation触发时都会调用
  store.subscribe((mutation, state) => {
    console.log('模块/mutations中的方法名', mutation.type);// mutation.type为修改的模块和方法，如：calculate/INCREMENT
    console.log('payload:', mutation.payload);// payload为mutations方法的参数
    console.log('state:', state);// state为store的状态树，包含所有模块的state
  })
}

export default new Vuex.Store({
  // 应用插件
  plugins: [loggerPlugin],
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