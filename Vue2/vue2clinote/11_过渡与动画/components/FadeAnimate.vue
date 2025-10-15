<!-- 淡入淡出动画 -->
<template>
    <div>
        <button @click="showMessage = !showMessage">切换消息</button>
        <!-- 将需要添加动画的元素包裹在 transition 组件中，并添加 name 属性指定动画名称（过渡类名前缀） -->
        <transition name="fade">
            <div v-if="showMessage" class="message">
                这是一条重要消息！
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showMessage: false
        }
    }
}
</script>

<style>
/* 定义进入和离开的初始状态 */
.fade-enter, .fade-leave-to {
    opacity: 0;
}

/* 定义过渡样式，name-enter-active 和 name-leave-active 分别指定进入和离开过程的动画 */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.message {
    background: #4CAF50;
    color: white;
    padding: 10px;
    margin: 10px 0;
}
</style>