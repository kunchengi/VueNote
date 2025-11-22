<template>
  <div>
    <p>未做防抖处理的输入框：</p>
    <h2>{{ userNameRef }}</h2>
    <input type="text" v-model="userNameRef">
    <p>做防抖处理的输入框：</p>
    <h2>{{ debounceUserNameRef }}</h2>
    <input type="text" v-model="debounceUserNameRef">
  </div>
</template>

<script lang="ts" setup name="App">
import { customRef,reactive } from 'vue'
import useDebounceRef from './hooks/useDebounceRef'

// 使用自定义ref实现响应式
const user = reactive({
  name: '张三',
  age: 18
})
// 创建一个自定义的ref对象，跟踪name属性的变化，当name属性变化时，触发更新
// track为依赖收集函数，trigger为触发更新函数
const userNameRef = customRef((track, trigger) => {
  return {
    // 获取自定义ref的值
    get() {
      track()// 调用track函数，告诉Vue依赖收集（跟踪）user.name
      return user.name
    },
    // 当修改自定义ref的值时，会触发set函数，newValue为新的值
    set(newValue) {
      user.name = newValue;// 当name属性变化时，更新user.name
      trigger()// 调用trigger函数，告诉Vue触发更新
    }
  }
})

// 使用自定义ref实现输入框防抖
const debounceUserNameRef = useDebounceRef(user.name, 1000)
</script>

<style scoped>
</style>
