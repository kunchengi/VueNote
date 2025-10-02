<template>
  <div id="app">
    <h1>当前日期：{{ currentDate }}</h1>
    <h1>{{ leftNum }} + {{ rightNum }} = {{ result }}</h1>
    <!-- 使用全局指令v-focus -->
    <input v-focus type="text">
    <!-- 使用全局组件Hello -->
    <Hello></Hello>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'App',
  data() {
    return {
      leftNum: 10,
      rightNum: 20,
      result: 0
    }
  },
  computed: {
    currentDate() {
      // 使用this调用插件的方法
      // return this.$dataUtils.formatDate(new Date())
      // 使用Vue调用插件的方法
      return Vue.dataUtils.formatDate(new Date())
    }
  },
  mounted() {
    // 使用this调用插件的方法
    this.result = this.$mathUtils.add(this.leftNum, this.rightNum)
  }
}
</script>

<style>

</style>
