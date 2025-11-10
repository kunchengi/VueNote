<template>
  <div class="home-container">
    <Sidebar />
    <div class="content">
      <!-- 子路由出口 -->
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup name="Home">
import Sidebar from '@/components/Sidebar.vue'
</script>

<style scoped>
.home-container {
    display: flex;
    height: 100vh;
}

.content {
    flex: 1;
    padding: 20px;
    background-color: #f4f4f4;
}
</style>
