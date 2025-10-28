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

// 创建一个路由器实例
const router = new VueRouter({
  // 配置路由规则
  routes: [
    {
      path: '/',
      redirect: '/home' // 默认重定向到home路由
    },
    {
      path: '/about',
      component: About,
      // 配置路由元信息
      meta: {
        // 页面标题
        title: '关于'
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        title: '首页'
      },
      // 配置Home组件的子路由规则
      children: [
        {
          name: 'JavaScript',// 给路由命名
          // path: 'javascript',
          path: 'javascript/:id/:content',// 占位用于接收路由的params参数
          component: JavaScriptCom,
          meta: {
            title: 'JavaScript',
            // 是否需要校验
            isAuth: true
          },
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
          meta: {
            title: 'Vue',
            isAuth: true
          },
          // 独享路由守卫
          beforeEnter: (to, from, next) => {
            console.log('独享路由守卫',to,from);
            if(to.params.id && to.params.content){
              next()
            }else{
              alert('请输入id和content参数')
              next(false)
            }
          },
          props: (route) => ({
            id: route.params.id,
            content: route.params.content
          })
        }
      ]
    }
  ]
})

// 全局前置路由守卫---初始化的时候被调用、每次路由切换之前被调用
// to是即将要进入的目标路由对象，有path、name、meta等属性
// from是当前导航正要离开的路由对象
// next是一个函数
router.beforeEach((to, from, next) => {
  console.log('前置路由守卫',to,from);
  // 如果目标路由需要校验
  if (to.meta.isAuth) {
    // 进行token校验
    const token = localStorage.getItem('token')
    if (token) {
      console.log('有token,校验通过');
      // 校验通过,继续路由切换
      next()
    } else {
      alert('请先登录');
      // 校验不通过,不继续路由切换
      next(false)
      // 或者跳转到登录页
      // next({name: 'Login'})
    }
  } else {
    // 无需校验,继续路由切换
    next()
  }
})

// 全局后置路由守卫---初始化的时候被调用、每次路由切换之后被调用
// to是即将要进入的目标路由对象
// from是当前导航正要离开的路由对象
// 不需要next()函数
router.afterEach((to, from) => {
  console.log('后置路由守卫',to,from);
  // 设置页面标题
  document.title = to.meta.title || '默认标题'
})

// 导出路由器实例
export default router
