<template>
  <div>
    {{ time }}
  </div>
</template>

<script setup lang="ts" name="HosCountdown">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  time: {
    type: Number,
    default: 60
  }
})

const emit = defineEmits(['finish'])

const time = ref(props.time)

let intervalId: number | undefined;

// 开始倒计时
const startCountdown = () => {
  intervalId = setInterval(() => {
    time.value--
    // 倒计时结束，清空定时器并触发 finish 事件
    if (time.value <= 0) {
      clearInterval(intervalId)
      emit('finish')
    }
  }, 1000)
}

// 停止倒计时
const stopCountdown = () => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
    intervalId = undefined
  }
}

// 组件挂载时开始倒计时
onMounted(() => {
  startCountdown()
})

// 组件卸载时停止倒计时
onUnmounted(() => {
  stopCountdown()
})
</script>

<style lang="scss" scoped>

</style>