<template>
  <div>
    <!-- 可以给组件添加ref属性，用于获取组件的实例，拿到该组件导出的数据 -->
    <Person ref="personRef" />
    <button @click="getPersonTitle">获取Person组件标题</button>
  </div>
</template>

<script lang="ts" setup name="App">
  // 引入组件，会自动注册组件
  import Person from './components/Person.vue'
  import { ref } from 'vue'

  // 定义一个ref，用于获取Person组件的引用
  const personRef = ref<InstanceType<typeof Person>>()
  // 定义一个方法，用于获取Person组件的实例
  const getPersonTitle = () => {
    // 通过ref.value获取Person组件的实例
    console.log(personRef.value);
    // 调用Person组件的getTitle方法，获取h2元素的文本内容
    personRef.value?.getTitle();
    // 调用Person组件的name属性
    console.log(personRef.value?.name);
  }
</script>

<style scoped>
</style>
