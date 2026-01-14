<template>
  <div class="hos-user">
    <!-- 左侧导航区域 -->
    <div class="hos-user__menu">
      <LeftMenu :menuList="menuList" :titleData="titleData" :selectedPath="route.path" @changeActive="changeActive" />
    </div>
    <!-- 右侧内容展示区域：路由组件展示位置 -->
    <div class="hos-user__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts" name="HosUser">
import { reactive } from 'vue'
import LeftMenu from '@/components/LeftMenu/index.vue'

import { Memo, Postcard, User } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute();

// 标题数据
const titleData = reactive({
  icon: User,
  name: '用户中心'
})

// 菜单列表
const menuList = reactive([
  {
    index: '/user/realNameAuth',
    name: '实名认证',
    icon: Postcard
  },
  {
    index: '/user/registrationOrder',
    name: '挂号订单',
    icon: Memo
  },
  {
    index: '/user/patientManage/mgr',
    name: '就诊人管理',
    icon: User
  }
])

// 切换菜单
const changeActive = (path: string) => {
  router.push({
    path: path
  })
}

</script>

<style lang="scss" scoped>
.hos-user {
  display: flex;

  .hos-user__menu {
    flex: 2;
  }

  .hos-user__content {
    flex: 8;
  }
}
</style>