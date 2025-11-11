<template>
  <div class="home-container">
    <Sidebar :courseList="courseList" />
    <div class="content">
      <!-- 子路由出口 -->
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup name="Home">
import { reactive } from 'vue';
import Sidebar from '@/components/Sidebar.vue'
const courseList = reactive([
    { id: "1", name: 'Vue', path: '/home/vue', content: '路由的使用' },
    { id: "2", name: 'JavaScript', path: '/home/javascript', content: '数组的方法' }
])
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
