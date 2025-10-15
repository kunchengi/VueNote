<!-- 滑动过渡效果 -->
<template>
  <div>
    <button @click="showSidebar = !showSidebar">切换菜单</button>
    <!-- 将需要添加动画的元素包裹在 transition 组件中，并添加 name 属性指定动画名称（过渡类名前缀） -->
    <transition name="slide">
      <div v-if="showSidebar" class="sidebar">
        <ul>
          <li>首页</li>
          <li>关于</li>
          <li>联系</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidebar: false
    }
  }
}
</script>

<style>
/* 定义进入和离开的初始状态 */
/* 开始状态和离开状态，侧边栏隐藏在左侧 */
.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}

/* 定义过渡样式，name-enter-active 和 name-leave-active 分别指定进入和离开过程的动画 */
/* 进入和离开过程，侧边栏平滑移动到左侧 */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}

.sidebar {
  width: 200px;
  background: #333;
  color: white;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 10vh;
  height: 90vh;
}
</style>