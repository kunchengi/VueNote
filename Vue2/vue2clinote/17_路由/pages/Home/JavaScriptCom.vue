<template>
  <div>
    <!-- 通过$route.query获取query参数 -->
    <!-- <h2>{{ $route.query.content }}</h2> -->
    <!-- 通过$route.params获取params参数 -->
    <!-- <h2>{{ $route.params.content }}</h2> -->
     <!-- 使用props参数 -->
    <h2>{{ content }}</h2>
    <input type="text" v-model="name">
    <h2>{{ name }}</h2>
  </div>
</template>

<script>
export default {
    name: 'JavaScriptCom',
    props: ['id', 'content'],// 接收路由的props参数
    data() {
        return {
            name: 'JavaScript组件'
        }
    }
}
</script>

<style>

</style>