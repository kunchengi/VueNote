<template>
    <div>
        <h1>User组件</h1>
        <h2>name：{{ name }}</h2>
        <!-- 在data中不能通过this访问setup简写中的数据，需要在setup中返回，这里渲染的是空 -->
        <h2>userName：{{ userName }}</h2>
        <h2>age：{{ age }}</h2>
        <button @click="changeName">修改姓名</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">显示电话</button>
    </div>
</template>

<!-- 可以写两个script标签，但如果只为了写name，建议使用vueSetupExtend插件，直接在script标签中添加name属性 -->
<!-- <script lang="ts">
export default {
    name: 'User',
    data() {
        return {
            userName: this.name,// 在data中不能通过this访问setup简写中的数据
        }
    },
}
</script> -->

<!-- setup简写，直接在script标签中添加setup属性，代表该标签内写的是setup函数，且会将内部声明的变量、函数等自动返回，不需要return -->
<!-- 使用vueSetupExtend插件，可以在script标签中添加name属性，代表组件的名称，在模板中可以直接使用组件名称 -->
<script setup lang="ts" name="User">
let name = '张三';
let age = 18;
let tel = '12345678901';
function changeName() {
    name = '李四';
}
function changeAge() {
    age++;
}
function showTel() {
    alert(tel);
}
</script>

<style></style>
