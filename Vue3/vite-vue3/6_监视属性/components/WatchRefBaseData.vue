<template>
  <div>
    <h2>监视ref的基本类型数据</h2>
    <div>sum：{{ sum }}</div>
    <button @click="addSum">点我+1</button>
  </div>
</template>

<script setup lang="ts" name="WatchRefBaseData">
// 引入ref函数
import { ref, watch } from 'vue'

// 使用ref创建响应式变量sum，初始值为0
const sum = ref(0)

// 定义一个函数addSum，用于增加sum的值
function addSum() {
  sum.value++
}

// 监视sum变量的变化
const stopWatch = watch(sum, (newValue, oldValue) => {
  console.log('sum变化了', newValue, oldValue)
  // 当sum的值大于5时，停止监视
  if (newValue > 5) {
    stopWatch()
  }
})
</script>

<style></style>
