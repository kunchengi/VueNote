<template>
  <div>
    <Person v-if="isShow" />
    <button @click="isShow = false">点我卸载组件</button>
  </div>
</template>

<script lang="ts" setup name="App">
import Person from './components/Person.vue'
import { ref } from 'vue'

const isShow = ref<boolean>(true)
</script>

<style scoped>
</style>
