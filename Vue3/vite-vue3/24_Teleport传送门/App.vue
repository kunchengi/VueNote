<template>
  <div>
    <div class="father">
      <!-- 点击按钮打开模态框 -->
      <button @click="openModal">打开模态框</button>
      <!-- 控制模态框显示隐藏 -->
      <Modal v-if="showModal" :closeModal="() => showModal = false" />
    </div>
  </div>
</template>

<script lang="ts" setup name="App">
import Modal from './components/Modal.vue'
import { ref } from 'vue'

const showModal = ref(false)

// 点击按钮打开模态框
const openModal = () => {
  showModal.value = true
}
</script>

<style scoped>
.father {
  position: relative;
  width: 800px;
  height: 600px;
  background-color: #ccc;
}
</style>
