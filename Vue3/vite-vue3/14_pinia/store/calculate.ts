// 计算模块相关的数据
// 引入defineStore函数
import { defineStore } from 'pinia'

// 创建计算模块的store
// 使用hooks的命名规范
// 参数1: store的唯一标识
// 参数2: store的配置对象
export const useCalculateStore = defineStore('calculate', {
  // 定义状态
  state: () => ({
    sum: 0
  }),
  // 定义方法，方法里的this指向当前的store实例
  actions: {
    // 当前求和为奇数再加
    incrementIfOdd(n: number) {
      if (this.sum % 2 !== 0) {
        this.sum += n;
      }
    },
    // 异步加
    async incrementAsync(n: number) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.sum += n;
    }
  },
  // 定义计算属性
  getters: {
    // 当前求和的平方
    // 写法一，使用参数中的state获取状态
    // square(state): number {
    //   return state.sum ** 2;
    // }
    // square:state => state.sum ** 2,
    // 写法二：通过this获取状态
    square(): number {
      return this.sum ** 2;
    }
  }
})

