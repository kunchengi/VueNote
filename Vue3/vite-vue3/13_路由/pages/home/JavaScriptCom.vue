<template>
  <div>
    <!-- <h1>{{ query.content }}</h1> -->
    <!-- <h1>{{ params.content }}</h1> -->
     <h1>{{ content }}</h1>
  </div>
</template>

<script lang="ts" setup name="JavaScriptCom">
// import { toRefs } from 'vue';
// import { useRoute } from 'vue-router';
// const route = useRoute();
// 解构赋值query并转换成响应式数据
// const { query } = toRefs(route);
// 解构赋值params并转换成响应式数据
// const { params } = toRefs(route);
// 定义props接收路由参数
defineProps(['id', 'content'])
</script>

<style scoped></style>
