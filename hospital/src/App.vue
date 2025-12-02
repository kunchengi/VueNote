<template>
  <div class="container">
    <!-- 引入顶部全局组件 -->
    <HospitalTop />
    <!-- 展示路由组件的区域 -->
     <div class="content">
        <router-view />
     </div>
     <!-- 引入底部全局组件 -->
     <HospitalButtom />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import request from '@/utils/request'

onMounted(() => {
  // 测试请求
  request.get('/hosp/hospital/2/10').then((res) => {
    console.log(res)
  })
})
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content{
    margin-top: 70px;
    width: 1200px;
    min-height: 700px;
  }
}
</style>
