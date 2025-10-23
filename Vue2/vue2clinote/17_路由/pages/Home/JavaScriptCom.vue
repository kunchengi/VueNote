<template>
  <div>
    <!-- 通过$route.query获取query参数 -->
    <h2>{{ $route.query.content }}</h2>
  </div>
</template>

<script>
export default {
    name: 'JavaScriptCom',
    mounted() {
        console.log(this.$route.query);// {id: '1', content: '数组的方法'}
    }
}
</script>

<style>

</style>