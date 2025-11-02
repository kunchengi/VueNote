<template>
  <div>
    姓：<input type="text" v-model="person.firstName">
    名：<input type="text" v-model="person.lastName">
    全名：<span>{{ fullName }}</span>
    <button @click="changeFullName">修改全名</button>
  </div>
</template>

<script setup lang="ts" name="Person">
// 引入计算属性函数computed
import { reactive, computed } from 'vue'

// 使用reactive创建响应式对象
const person = reactive({
  firstName: '张',
  lastName: '三',
})

// 使用computed创建只读的计算属性，计算全名，会在依赖值变化时自动更新
// const fullName = computed(() => {
//   return person.firstName + person.lastName;
// })
// // 该方式创建的计算属性是只读的，不能直接修改计算属性的值
// fullName.value = '李四'

// 创建可读可写的计算属性
const fullName = computed({
  get: () => {
    return person.firstName + person.lastName;
  },
  // 当fullName.value被赋值时，会调用set函数
  set: (newValue) => {
    // 更新 firstName 和 lastName
    person.firstName = newValue.slice(0, 1);
    person.lastName = newValue.slice(1);
  }
})

// 直接修改计算属性的值，会触发set函数
function changeFullName() {
  fullName.value = '李四';
}

console.log(fullName);// ComputedRefImpl
</script>

<style></style>
