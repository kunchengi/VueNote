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
  }
})

