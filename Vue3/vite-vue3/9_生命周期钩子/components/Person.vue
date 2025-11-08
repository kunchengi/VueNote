<template>
  <div>
    <h2>当前求和为{{ sum }}</h2>
    <button @click="sum += 1">点我加1</button>
  </div>
</template>

<script lang="ts" setup name="Person">
// 引入ref和生命周期函数
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

const sum = ref<number>(0);

console.log('组件初始化（setup，替代vue2的beforeCreate和created钩子）');

onBeforeMount(() => {
  console.log('组件挂载前调用')
})

onMounted(() => {
  console.log('组件挂载完成后调用')
})

onBeforeUpdate(() => {
  console.log('组件更新前调用')
})

onUpdated(() => {
  console.log('组件更新完成后调用')
})

onBeforeUnmount(() => {
  console.log('组件卸载前调用')
})

onUnmounted(() => {
  console.log('组件卸载完成后调用')
})
</script>

<style scoped>
</style>
