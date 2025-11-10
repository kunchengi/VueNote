<template>
  <div>
    <TopBar />
    <!-- 路由出口，用于渲染匹配到的路由组件 -->
    <RouterView />
  </div>
</template>

<script lang="ts" setup name="App">
import TopBar from '@/components/TopBar.vue'
</script>

<style scoped>
</style>
