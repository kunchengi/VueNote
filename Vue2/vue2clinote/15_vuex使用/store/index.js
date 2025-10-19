// 该文件用于创建Vuex最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'
// 引入常量模块
import * as constant from './constant'
// 应用Vuex插件
Vue.use(Vuex)

// 存放所有状态的对象
const state = {
    sum: 0
}

// 创建用户响应动作的actions对象
// actions中的方法名用小写
// context参数是上下文对象，包含store实例中的commit、dispatch方法和getters、state等属性，用于操作store
const actions = {
    // 同步操作没必要写在这，一般写在mutations中，组件可直接通过commit方法触发
    // 加法动作
    // increment(context, value) {
    //     context.commit(constant.INCREMENT, value)
    // },
    // 减法动作
    // decrement(context, value) {
    //     context.commit(constant.DECREMENT, value)
    // },
    // 异步等待1秒动作（为了演示在actions中触发actions中的其他方法，所以加了这个方法）
    async await1s(context, value) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
    },
    // 异步加法动作
    async incrementAsync(context, value) {
        // // 模拟异步操作
        // const await1sPromise = new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve()
        //     }, 1000)
        // })
        // // 等待1秒后触发mutations中的INCREMENT方法
        // await await1sPromise
        // // 触发mutations中的INCREMENT方法
        // context.commit(constant.INCREMENT, value)

        // 这里还可以通过dispatch触发actions中的其他方法
        await context.dispatch(constant.AWAIT1S)
        // 触发mutations中的INCREMENT方法
        context.commit(constant.INCREMENT, value)
    }
}

// 创建用户响应状态改变的mutations对象
// mutations中的方法名用大写
const mutations = {
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
}

// 计算属性，有些属性是可以根据当前状态计算出来的，写在getters中
const getters = {
    // 计算当前状态的平方
    square(state) {
        return state.sum * state.sum
    }
}

// 创建并导出store实例
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})