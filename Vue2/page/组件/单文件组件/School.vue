<!--快速创建vue模板的快捷键，<v回车-->
<!-- 定义html模板结构 -->
<template>
    <div class="demo">
        <h1>学校名称：{{ name }}</h1>
        <h1>学校地址：{{ address }}</h1>
    </div>
</template>

<!--定义组件交互相关的代码-->
<script>
// 默认暴露组件
export default {
    name: 'School',//设置组件名，最好与文件名保持一致
    data() {
        return {
            name: '学校名称',
            address: '学校地址'
        }
    }
}
</script>
<!--定义组件的css样式-->
<style scoped>
    .demo {
        color: red;
    }
</style>
