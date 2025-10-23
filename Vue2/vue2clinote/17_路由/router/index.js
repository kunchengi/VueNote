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
          path: 'javascript',
          component: JavaScriptCom
        },
        {
          path: 'vue',
          component: VueCom
        }
      ]
    }
  ]
})
