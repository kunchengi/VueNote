import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('@/pages/home/index.vue')// 懒加载路由
    },
    {
      path: '/hospital',
      component: () => import('@/pages/hospital/index.vue')
    },
    {
      path: '/',
      redirect: '/home'
    }
  ],
  scrollBehavior() {
    // 始终滚动到顶部和左侧
    return { 
      top: 0,
      left: 0,
    }
  }
})
