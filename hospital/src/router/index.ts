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
          component: () => import('@/pages/HosHospital/HospitalRegister/index.vue'),
          children: [
            {
              path: 'info',
              component: () => import('@/pages/HosHospital/HospitalRegister/RegisterInfo/index.vue')
            },
            {
              path: 'reservation',
              component: () => import('@/pages/HosHospital/HospitalRegister/RegisterReservation/index.vue')
            },
            {
              path: 'confirm',
              component: () => import('@/pages/HosHospital/HospitalRegister/RegisterConfirm/index.vue')
            }
          ]
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
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/pages/HosUser/index.vue'),
      children: [
        {
          path: 'realNameAuth',
          component: () => import('@/pages/HosUser/RealNameAuth/index.vue')
        },
        {
          path: 'registrationOrder',
          component: () => import('@/pages/HosUser/RegistrationOrder/index.vue')
        },
        {
          path: 'patientManage',
          component: () => import('@/pages/HosUser/PatientManage/index.vue'),
          children: [
            {
              path: 'mgr',
              component: () => import('@/pages/HosUser/PatientManage/PatientMgr/index.vue')
            },
            {
              path: 'edit',
              component: () => import('@/pages/HosUser/PatientManage/EditPatient/index.vue')
            }
          ]
        }
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
