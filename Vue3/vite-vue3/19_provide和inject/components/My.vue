<template>
    <div>
        <h1>我是孙子组件，我收到了我爷爷给我的：{{ giveGrandson.car }}和{{ giveGrandson.money }}</h1>
    </div>
</template>
 
<script lang="ts" setup name="My">
import { inject } from 'vue';

// 注入祖先组件提供的数据
// 第一个参数：提供的数据的key
// 第二个参数：默认值
const giveGrandson = inject('giveGrandson', {
    car: '爱玛',
    money: '1000块',
});
</script>

<style></style>