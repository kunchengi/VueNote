<template>
  <div>
    <!-- 如果直接使用异步组件，会提示：setup函数返回了一个promise，但在父组件树中找不到<Suspense>边界。具有异步setup（）的组件必须嵌套在<Suspense>中才能呈现。 -->
    <!-- <User /> -->
    <Suspense>
      <!-- 默认插槽，异步组件加载完成后显示 -->
      <template #default>
        <User />
      </template>
      <!-- 备用插槽，异步组件加载完成前显示 -->
      <template #fallback>
        <div>加载中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts" setup name="App">
import User from './components/User.vue'
</script>

<style scoped></style>
