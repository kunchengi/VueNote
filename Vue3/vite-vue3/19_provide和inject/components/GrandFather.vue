<template>
    <div>
        <h1>我是爷爷组件，我给儿子和孙子一些东西：</h1>
        <Father/>
    </div>
</template>
 
<script lang="ts" setup name="GrandFather">
import Father from './Father.vue'
import { reactive, provide } from 'vue';

// 给儿子的东西
const giveSon = reactive({
    car: '奔驰',
    money: '500万',
})

// 给孙子的东西
const giveGrandson = reactive({
    car: '法拉利',
    money: '1000万',
})

// 向后代提供数据
provide('giveSon', giveSon);
provide('giveGrandson', giveGrandson);
</script>

<style></style>