<template>
  <div class="home-container">
    <Sidebar :courseList="courseList" />
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
    },
    data() {
        return {
            courseList: [
                { id: "2", name: 'Vue', path: '/home/vue', content: '路由的使用' },
                { id: "1", name: 'JavaScript', path: '/home/javascript', content: '数组的方法' }
            ]
        }
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