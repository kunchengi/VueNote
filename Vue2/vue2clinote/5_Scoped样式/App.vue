<template>
  <div id="app">
    <div class="example">
      <Hello />
      <h1>标题</h1>
      <p>内容</p>
      <!-- style中的样式正常情况下不会对动态渲染html内容生效 -->
      <div v-html="htmlContent"  ></div>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'

export default {
  name: 'App',
  components: {
    Hello
  },
  data() {
    return {
      htmlContent: `
        <div class="dynamic-content">
          动态渲染的内容
        </div>
      `
    }
  }
}
</script>

<style scoped>
.example {
  color: aqua;
}

h1 {
  font-size: 20px;
}

/* 选择子组件的根元素，样式会生效 */
.hello {
  color: blue;
}

/* 直接选择子组件内部的元素，样式不会生效 */
.hello .inner-text {
  color: red;
}

/* 使用深度选择语法，选择子组件内部的元素，样式会生效 */
.hello /deep/ .inner-text {
  color: green;
}

/* 直接选择动态渲染的html内容中的元素，样式不生效 */
.dynamic-content {
  color: pink;
}
.example .dynamic-content {
  color: pink;
}

/* 需要使用深度选择语法（>>> 或 ::v-deep 或 /deep/），样式会生效， */
/* .example >>> .dynamic-content {
  color: pink;
} */
.example ::v-deep .dynamic-content {
  color: pink;
}
</style>
