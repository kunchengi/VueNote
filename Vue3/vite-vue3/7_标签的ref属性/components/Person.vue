<template>
  <div>
    <h2 ref="titleRef">学习vue3</h2>
    <button @click="getTitle">获取标题</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import { ref, defineExpose } from 'vue'

  // 定义一个ref，用于获取h2元素的引用
  const titleRef = ref<HTMLHeadingElement>();
  const nameRef = ref<string>('Person');

  // 定义一个方法，用于获取h2元素的文本内容
  const getTitle = () => {
    // 通过ref.value获取h2元素，再获取其文本内容
    console.log(titleRef.value?.textContent)
  }
  // 导出getTitle方法，用于在App.vue中调用
  defineExpose({
    getTitle,
    name: nameRef.value
  })
</script>

<style scoped>
</style>
