<template>
  <div>
    <button @click="showBox = !showBox">切换动画</button>
    
    <transition
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    >
      <div v-if="showBox" class="animated-box">
        动画效果！
      </div>
    </transition>
  </div>
</template>

<script>
import 'animate.css'

export default {
  data() {
    return {
      showBox: false
    }
  }
}
</script>

<style>

.animated-box {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin: 20px 0;
}
</style>