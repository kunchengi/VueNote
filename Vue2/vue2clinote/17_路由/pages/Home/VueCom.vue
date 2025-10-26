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
            name: 'Vue组件',
            timer: null
        }
    },
    activated() {
        console.log('VueCom组件被激活了,开启定时器')
        // 开启定时器
        this.timer = setInterval(() => {
            console.log('定时器在运行')
        }, 1000)
    },
    deactivated() {
        console.log('VueCom组件被失活了,清除定时器')
        // 清除定时器
        clearInterval(this.timer)
    }
}
</script>

<style>

</style>