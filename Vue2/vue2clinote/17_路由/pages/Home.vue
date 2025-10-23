<template>
  <div class="home-container">
    <Sidebar />
    <div class="content">
        <!-- 显示Home的子路由组件 -->
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
    name: 'Home',
    components: {
        Sidebar,
    }
}
</script>

<style>
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