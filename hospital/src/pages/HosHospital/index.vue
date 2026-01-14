<template>
  <div class="hos-hospital">
    <!-- 左侧导航区域 -->
    <div class="hos-hospital__menu">
      <LeftMenu :menuList="menuList" :titleData="titleData" @changeActive="changeActive" />
    </div>
    <!-- 右侧内容展示区域：路由组件展示位置 -->
    <div class="hos-hospital__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts" name="HosHospital">
import { onMounted, reactive } from 'vue'
import useHospitalDetailStore from '@/store/modules/hospitalDetail'
import LeftMenu from '@/components/LeftMenu/index.vue'

import { CreditCard, Document, Bell, Warning, Search, HomeFilled } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const $route = useRoute()

// 医院详情仓库
const detailStore = useHospitalDetailStore()

// 标题数据
const titleData = reactive({
  icon: HomeFilled,
  name: '医院信息'
})

// 菜单列表
const menuList = reactive([
  {
    index: '/hospital/register/info',
    name: '预约挂号',
    icon: CreditCard
  },
  {
    index: '/hospital/detail',
    name: '医院详情',
    icon: Document
  },
  {
    index: '/hospital/notice',
    name: '预约通知',
    icon: Bell
  },
  {
    index: '/hospital/close',
    name: '停诊信息',
    icon: Warning
  },
  {
    index: '/hospital/search',
    name: '查询/取消',
    icon: Search
  }
])

// 切换菜单
const changeActive = (path: string) => {
  router.push({
    path: path,
    query: {
      hoscode: $route.query.hoscode
    }
  })
}

// 组件挂载完毕，通知pinia仓库发请求获取医院详情
onMounted(() => {
  const hoscode = $route.query.hoscode as string;
  if (hoscode) {
    detailStore.loadHospitalDetail(hoscode);
    detailStore.loadDepartmentList(hoscode);
  }
})
</script>

<style lang="scss" scoped>
.hos-hospital {
  display: flex;

  .hos-hospital__menu {
    flex: 2;
  }

  .hos-hospital__content {
    flex: 8;
  }
}
</style>