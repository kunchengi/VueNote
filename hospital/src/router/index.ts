import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('@/pages/HosHome/index.vue')// 懒加载路由
    },
    {
      path: '/hospital',
      component: () => import('@/pages/HosHospital/index.vue'),
      children: [
        {
          path: 'register',
          component: () => import('@/pages/HosHospital/HospitalRegister/index.vue')
        },
        {
          path: 'detail',
          component: () => import('@/pages/HosHospital/HospitalDetail/index.vue')
        },
        {
          path: 'notice',
          component: () => import('@/pages/HosHospital/HospitalNotice/index.vue')
        },
        {
          path: 'close',
          component: () => import('@/pages/HosHospital/HospitalClose/index.vue')
        },
        {
          path: 'search',
          component: () => import('@/pages/HosHospital/HospitalSearch/index.vue')
        },
        {
          path: 'reservation',
          component: () => import('@/pages/HosHospital/HospitalReservation/index.vue')
        },
      ]
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
