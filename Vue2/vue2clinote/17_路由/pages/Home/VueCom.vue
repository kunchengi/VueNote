<template>
  <div>
    <!-- <h2>{{ $route.query.content }}</h2> -->
    <!-- <h2>{{ $route.params.content }}</h2> -->
    <h2>{{ content }}</h2>
  </div>
</template>

<script>
export default {
    name: 'VueCom',
    props: ['id', 'content'],// 接收路由的props参数
}
</script>

<style>

</style>