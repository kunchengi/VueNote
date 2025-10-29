<template>
  <div id="app">
    app根组件
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    console.log(process.env.NODE_ENV);// development
    console.log(process.env.BASE_URL);//
    console.log(process.env.VUE_APP_API_URL);// http://localhost:3000/api
    console.log(process.env.VUE_APP_DEBUG);// true
  }
}
</script>

<style>

</style>
