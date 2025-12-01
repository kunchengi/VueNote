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

onMounted(() => {
  console.log(import.meta.env.VITE_APP_TITLE)
  console.log(import.meta.env.VITE_APP_VERSION)
  console.log(import.meta.env.VITE_API_BASE_URL)
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
