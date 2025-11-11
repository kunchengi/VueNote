// 该文件专门用于创建整个应用的路由器
// 引入创建路由器的函数和创建History路由模式的函数
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import About from '@/pages/About.vue'
import Home from '@/pages/Home.vue'
import JavaScriptCom from '@/pages/home/JavaScriptCom.vue'
import VueCom from '@/pages/home/VueCom.vue'
// 创建一个路由器实例
const router = createRouter({
  // 路由模式，这里使用History路由模式
  history: createWebHistory(),
  // 使用Hash路由模式
  // history: createWebHashHistory(),
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
          name: 'JavaScript',
          path: 'javascript/:id/:content?',// 占位用于接收路由的params参数，content参数可选
          component: JavaScriptCom
        },
        {
          name: 'Vue',
          path: 'vue/:id/:content?',// 占位用于接收路由的params参数，content参数可选
          component: VueCom
        }
      ]
    }
  ]
})
// 导出路由实例
export default router
