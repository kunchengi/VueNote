<template>
  <div>
    <!-- <h2>{{ $route.query.content }}</h2> -->
    <!-- <h2>{{ $route.params.content }}</h2> -->
    <h2>{{ content }}</h2>
    <input type="text" v-model="name">
    <h2>{{ name }}</h2>
  </div>
</template>

<script>
export default {
    name: 'VueCom',
    props: ['id', 'content'],// 接收路由的props参数
    data() {
        return {
            name: 'Vue组件'
        }
    }
}
</script>

<style>

</style>