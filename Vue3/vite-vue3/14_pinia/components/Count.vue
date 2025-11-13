<template>
    <div>
        <h1>当前求和为：{{ sum }}</h1>
        <h1>当前求和的平方为：{{ square }}</h1>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="increment(n)">+</button>
        <button @click="decrement(n)">-</button>
        <!-- 第三种修改方式，通过actions方法修改状态 -->
        <button @click="calculateStore.incrementIfOdd(n)">当前求和为奇数再加</button>
        <button @click="calculateStore.incrementAsync(n)">异步加</button>
    </div>
</template>

<script lang="ts" setup name="Count">
// 获取计算模块的store
import { useCalculateStore } from '@/store/calculate'
const calculateStore = useCalculateStore();
// 直接获取sum状态
console.log('sum', calculateStore.sum);
// 也可以通过$state来访问状态，但不推荐
console.log('sum', calculateStore.$state.sum);
// 也可以通过解构赋值的方式获取状态，但需要使用storeToRefs函数，如果不使用会丢失响应式
import { storeToRefs } from 'pinia'
const { sum } = storeToRefs(calculateStore);

import { ref, computed } from 'vue'
// const sum = ref(0);
const n = ref(1);
const square = computed(() => sum.value ** 2);
// 加
function increment(n: number) {
    // 第一种修改方式，直接修改sum状态
    calculateStore.sum += n;
}
// 减
function decrement(n: number) {
    // 第二种修改方式，通过$patch方法修改状态;
    // 该方式可以一次修改多个状态
    calculateStore.$patch({
        sum: calculateStore.sum - n
    })
}

</script>

<style scoped>
button {
    margin-left: 5px;
}
</style>