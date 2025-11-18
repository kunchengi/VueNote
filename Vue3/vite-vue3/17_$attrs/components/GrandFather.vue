<template>
    <div>
        <h1>我是爷爷组件，我给儿子和孙子一些东西：</h1>
        <Father :giveSon="giveSon" :giveGrandson="giveGrandson" />
    </div>
</template>
 
<script lang="ts" setup name="GrandFather">
import Father from './Father.vue'
import { reactive } from 'vue';

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
</script>

<style></style>