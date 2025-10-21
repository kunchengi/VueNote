// 引入常量模块
import * as constant from '../constant'
// 计算模块
const calculateModule = {
  namespaced: true, // 开启命名空间，模块中的mutations和getters会自动添加模块名前缀，可以在组件中通过模块名/方法名调用
  state: () => ({
    sum: 0
  }),
  getters: {
    // 计算当前状态的平方
    square(state) {
      return state.sum * state.sum
    }
  },
  mutations: {
    // 加法
    INCREMENT(state, value) {
      // 更新状态
      state.sum += value
    },
    // 减法
    DECREMENT(state, value) {
      // 更新状态
      state.sum -= value
    }
  },
  // 异步动作，方法中的第一个参数为当前模块的上下文对象，包含commit、dispatch、state、getters等属性
  actions: {
    // 异步等待1秒动作
    async await1s(context, value) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
    // 异步加法动作
    async incrementAsync(context, value) {
      await context.dispatch(constant.AWAIT1S)
      // 触发mutations中的INCREMENT方法
      context.commit(constant.INCREMENT, value)
    }
  }
}

export default calculateModule