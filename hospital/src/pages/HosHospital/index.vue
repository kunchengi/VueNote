<template>
  <div class="hos-hospital">
    <!-- 左侧导航区域 -->
    <div class="hos-hospital__menu">
      <div class="top">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>/ 医院信息</span>
      </div>
      <el-menu :default-active="menuList?.[0]?.index || ''" class="el-menu-vertical-demo" >
        <el-menu-item v-for="item in menuList" :key="item.index" :index="item.index" @click="changeActive($event)">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
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

import { CreditCard, Document, Bell, Warning, Search, HomeFilled } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const $route = useRoute()

// 医院详情仓库
const detailStore = useHospitalDetailStore()

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

const changeActive = ($event: any) => {
  router.push({
    path: $event.index,
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
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #7f7f7f;
  }

  .hos-hospital__content {
    flex: 8;
  }
}
</style>