<template>
  <div>
    <button @click="showCustom = !showCustom">自定义动画</button>
    <!-- 将需要添加动画的元素包裹在 transition 组件中 -->
    <!-- 绑定before-enter、enter、leave 事件 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div v-if="showCustom" class="custom-animation">
        自定义动画效果
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCustom: false
    }
  },
  methods: {
    // 自定义进入的初始状态
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.transform = 'scale(0)'
    },
    // 自定义进入过程动画
    enter(el, done) {
      // 使用 Velocity.js 或原生动画
      let opacity = 0
      let scale = 0
      
      const animate = () => {
        opacity += 0.1
        scale += 0.1
        el.style.opacity = opacity
        el.style.transform = `scale(${scale})`
        
        if (opacity < 1) {
          requestAnimationFrame(animate)
        } else {
          done() // 动画完成回调
        }
      }
      animate()
    },
    // 自定义离开过程动画
    leave(el, done) {
      // 离开动画逻辑
      let opacity = 1
      
      const animate = () => {
        opacity -= 0.1
        el.style.opacity = opacity
        
        if (opacity > 0) {
          requestAnimationFrame(animate)
        } else {
          done()
        }
      }
      animate()
    }
  }
}
</script>

<style>
.custom-animation {
  padding: 20px;
  background: #3498db;
  color: white;
  margin: 10px 0;
}
</style>