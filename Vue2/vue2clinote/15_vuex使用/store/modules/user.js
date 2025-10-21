// 引入常量模块
import { SET_FIRSTNAME, SET_LASTNAME, AWAIT1S, SET_NAME } from '../constant'
const userModule = {
  namespaced: true, // 开启命名空间，模块中的mutations和getters会自动添加模块名前缀，可以在组件中通过模块名/方法名调用
  state: () => ({
    firstname: '张',// 姓
    lastname: '三',// 名
  }),
  getters: {
    // 姓名
    fullName: state => `${state.firstname}${state.lastname}`,
  },
  mutations: {
    [SET_FIRSTNAME](state, firstname) {
      state.firstname = firstname
    },
    [SET_LASTNAME](state, lastname) {
      state.lastname = lastname
    }
  },
  actions: {
    // 异步等待1秒动作（为了演示在actions中触发actions中的其他方法，所以加了这个方法）
    async [AWAIT1S](context, value) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
    async [SET_NAME](context, { firstname, lastname }) {
      // 等待1秒
      await context.dispatch(AWAIT1S)
      context.commit(SET_FIRSTNAME, firstname)
      context.commit(SET_LASTNAME, lastname)
    }
  }
}

export default userModule