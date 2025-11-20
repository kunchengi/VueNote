<template>
    <div>
        <h1>我是父亲组件，我收到了我爸给我的：{{ giveSon.car }}和{{ giveSon.money }}</h1>
        <My />
    </div>
</template>
 
<script lang="ts" setup name="Father">
import My from './My.vue'
import { inject } from 'vue';

// 注入祖先组件提供的数据
// 第一个参数：提供的数据的key
// 第二个参数：默认值
const giveSon = inject('giveSon', {
    car: '雅迪',
    money: '100块',
});

</script>

<style></style>