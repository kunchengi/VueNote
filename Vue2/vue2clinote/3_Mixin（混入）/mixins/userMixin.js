// 定义mixin 对象
export const mathMixin = {
  data() {
    return {
      leftNum: 100,// 如果组件有leftNum属性，就用组件的属性，否则用mixin的属性
    }
  },
  methods: {
    add(a, b) {
      return a + b
    }
  }
}

export const userMixin = {
  data() {
    return {
      userInfo: {
        name: '默认用户',
        email: 'default@example.com'// 数据对象会进行递归合并，如果组件的userInfo属性有email属性，就用组件的属性，否则用mixin的属性
      }
    }
  },
  // 和组件同名钩子函数会合并为数组，mixin 的钩子先调用，组件钩子后调用
  created() {
    console.log('userMixin created')
  },
  methods: {
    // 同名方法、计算属性、指令，以组件的优先
    getUserInfo() {
      return this.userInfo.name + ' (' + this.userInfo.email + ')'
    }
  }
}

// apiMixin.js
export const apiMixin = {
  data() {
    return {
      loading: false,
      error: null
    }
  },
  methods: {
    async callApi(url) {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(url)
        return await response.json()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
}