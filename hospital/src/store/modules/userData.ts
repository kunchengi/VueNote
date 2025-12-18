import { defineStore } from 'pinia'
import { type UserInfo } from '@/api/login/type'

const userDataStore = defineStore('userData', {
  state: () => ({
    userInfo: null as UserInfo | null,
  }),
  actions: {
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo;
    },
  },
  // 使用持久化插件，将 userInfo 字段持久化到 localStorage 中
  // 也可以不使用插件，手动使用 localStorage 进行存储
  persist: {
    key: 'userInfo', // 自定义存储 Key
    pick: ['userInfo'], // 仅持久化 userInfo 字段
  }
}
)


export default userDataStore;