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
    },
    // 组件内路由守卫-进入组件时调用
    beforeRouteEnter(to, from, next) {
        console.log('组件内路由守卫-进入组件时调用',to,from);
        // 不能使用this,因为组件实例还没有创建
        console.log(this);// undefined
        if(to.params.id && to.params.content){
            // 可以通过next回调函数获取组件实例
            next((vm) => {
                console.log(vm);// VueCom组件实例
            })
        }else{
          alert('请输入id和content参数')
          next(false)
        }
    },
    // 组件内路由守卫-离开组件时调用
    beforeRouteLeave(to, from, next) {
        console.log('组件内路由守卫-离开组件时调用',to,from);
        next()
    }
}
</script>

<style>

</style>