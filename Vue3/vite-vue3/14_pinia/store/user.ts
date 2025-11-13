// 用户模块相关的数据
// 引入defineStore函数
import { defineStore } from 'pinia'

// 创建用户模块的store
// 使用hooks的命名规范
// 参数1: store的唯一标识
// 参数2: store的配置对象
export const useUserStore = defineStore('user', {
  // 定义状态
  state: () => ({
    firstname: '张',
    lastname: '三'
  }),
  // 定义方法，方法里的this指向当前的store实例
  actions: {
    // 提交用户信息
    setName({ firstname, lastname }: { firstname: string; lastname: string }) {
      this.firstname = firstname;
      this.lastname = lastname;
    }
  }
})