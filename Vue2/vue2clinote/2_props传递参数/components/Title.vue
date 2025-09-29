<template>
  <div ref="title">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: ['title'],
    created() {
        // 通过this.title访问props中的title属性
        console.log(this.title);
    },
    mounted() {
        // 未在组件 props 选项中声明的属性，如果设置了inheritAttrs: false，这些属性就不会自动添加到组件的根元素上。
        console.log(this.$refs.title);// <div><h1>用户信息</h1></div>
    }
}
</script>

<style>

</style>