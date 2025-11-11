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
          name: 'Vue',
          path: 'vue/:id/:content?',// 占位用于接收路由的params参数，content参数可选
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
// 导出路由实例
export default router
