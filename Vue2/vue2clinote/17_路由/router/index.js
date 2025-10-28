// 该文件专门用于创建整个应用的路由器
// 引入Vue
import Vue from 'vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 安装Vue Router插件
Vue.use(VueRouter)
// 引入组件
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import JavaScriptCom from '../pages/Home/JavaScriptCom.vue'
import VueCom from '../pages/Home/VueCom.vue'

// 全局错误处理
// 重写push和replace方法,捕获路由切换过程中发生的错误
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name === 'NavigationDuplicated') {
      console.log('重复导航错误:', err);
      // 忽略重复导航错误
      return Promise.resolve(err)
    }
    // 其他错误继续抛出
    return Promise.reject(err)
  })
}

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => {
    if (err.name === 'NavigationDuplicated') {
      console.log('重复导航错误:', err);
      // 忽略重复导航错误
      return Promise.resolve(err)
    }
    // 其他错误继续抛出
    return Promise.reject(err)
  })
}

// 创建并暴露一个路由器实例
export default new VueRouter({
  // 配置路由规则
  routes: [
    {
      path: '/',
      redirect: '/home' // 默认重定向到home路由
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      // 配置Home组件的子路由规则
      children: [
        {
          name: 'JavaScript',// 给路由命名
          // path: 'javascript',
          path: 'javascript/:id/:content',// 占位用于接收路由的params参数
          component: JavaScriptCom,
          // props参数配置,将路由的query/params参数作为props参数传递给组件
          // 1. 对象形式，跳转到JavaScriptCom组件时，会将该对象的属性传递给组件。一般不会这么写，因为把数据写死了
          // props: {
          //   id: '1',
          //   content: 'promise的使用'
          // }
          // 2. 布尔值形式，为true时将路由的params参数作为props参数传递给组件，只适用于params参数
          // props: true
          // 3. 函数形式，返回一个对象，对象的属性就是props参数.参数route为路由对象,可以获取到路由的query和params参数
          props: (route) => ({
            id: route.params.id,
            content: route.params.content
          })
          // props: (route) => ({
          //   id: route.query.id,
          //   content: route.query.content
          // })
        },
        {
          name: 'Vue',// 给路由命名
          // path: 'vue',
          path: 'vue/:id/:content',// 占位用于接收路由的params参数
          component: VueCom,
          props: (route) => ({
            id: route.params.id,
            content: route.params.content
          })
        }
      ]
    }
  ]
})
