<template>
  <div>
    <!-- 通过$route.query获取query参数 -->
    <!-- <h2>{{ $route.query.content }}</h2> -->
    <!-- 通过$route.params获取params参数 -->
    <!-- <h2>{{ $route.params.content }}</h2> -->
     <!-- 使用props参数 -->
    <h2>{{ content }}</h2>
  </div>
</template>

<script>
export default {
    name: 'JavaScriptCom',
    props: ['id', 'content'],// 接收路由的props参数
    mounted() {
        // console.log(this.$route.query);// {id: '1', content: '数组的方法'}
        // console.log(this.$route.params);// {id: '1', content: '数组的方法'}
    }
}
</script>

<style>

</style>