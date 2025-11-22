<!-- 模态框组件 -->
<template>
    <!-- 由于组件默认渲染到父元素内,如果没有写teleport，modal的位置是相对于父元素的 -->
    <!-- 可以将模态框渲染到body标签内,如果写了teleport，modal的位置是相对于to选择的元素 -->
    <!-- to的内容时class选择器的字符串 -->
    <teleport to="body">
        <div class="modal">
            <div class="modal-content">
                <h2>模态框标题</h2>
                <p>这是一个模态框内容</p>
                <!-- 点击关闭按钮关闭模态框 -->
                <button @click="closeModal">关闭</button>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts" name="Modal">
defineProps(['closeModal'])
</script>

<style scoped>
.modal {
    /* absolute是相对于最近的有定位的父元素 */
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 300px;
    background-color: skyblue;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
