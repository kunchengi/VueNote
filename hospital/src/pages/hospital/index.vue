<template>
  <div class="hospital">
    <!-- 左侧导航区域 -->
    <div class="menu">
      <div class="top">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>/ 医院信息</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" >
        <el-menu-item index="/hospital/register" @click="changeActive($event)">
          <el-icon>
            <CreditCard />
          </el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeActive($event)">
          <el-icon>
            <Document />
          </el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeActive($event)">
          <el-icon>
            <Bell />
          </el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeActive($event)">
          <el-icon>
            <Warning />
          </el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeActive($event)">
          <el-icon>
            <Search />
          </el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧内容展示区域：路由组件展示位置 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts" name="Hospital">
import { onMounted } from 'vue'
import useHospitalDetailStore from '@/store/modules/hospitalDetail'

import { CreditCard, Document, Bell, Warning, Search, HomeFilled } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const $route = useRoute()

const detailStore = useHospitalDetailStore()

const changeActive = ($event: any) => {
  router.push({
    path: $event.index
  })
}

// 组件挂载完毕，通知pinia仓库发请求获取医院详情
onMounted(() => {
  const hoscode = $route.query.hoscode as string;
  if (hoscode) {
    detailStore.getHospitalDetail(hoscode)
  }
})
</script>

<style lang="scss" scoped>
.hospital {
  display: flex;

  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #7f7f7f;
  }

  .content {
    flex: 8;
  }
}
</style>