<template>
  <div>
    <h1>{{ query.content }}</h1>
  </div>
</template>

<script lang="ts" setup name="VueCom">
import { toRefs } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
// 解构赋值query并转换成响应式数据
const { query } = toRefs(route);
</script>

<style scoped></style>
