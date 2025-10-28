<template>
  <div id="app">
    <TopBar></TopBar>
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'

export default {
  name: 'App',
  components: {
    TopBar
  },
  mounted() {
    // 模拟登陆后设置token
    localStorage.setItem('token', '123456');
    // 模拟未登陆状态,删除token
    // localStorage.removeItem('token');
  }
}
</script>

<style>

</style>
