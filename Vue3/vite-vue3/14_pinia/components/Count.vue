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
        <button @click="incrementIfOdd">当前求和为奇数再加</button>
        <button @click="incrementAsync(n)">异步加</button>
    </div>
</template>

<script lang="ts" setup name="Count">
import { ref, computed } from 'vue'
const sum = ref(0);
const n = ref(1);
const square = computed(() => sum.value ** 2);
// 加
function increment(n: number) {
    sum.value += n;
}
// 减
function decrement(n: number) {
    sum.value -= n;
}
// 当前求和为奇数再加
function incrementIfOdd() {
    if (sum.value % 2 !== 0) {
        sum.value += n.value;
    }
}
// 异步加
async function incrementAsync(n: number) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    sum.value += n;
}



</script>

<style scoped>
button {
    margin-left: 5px;
}
</style>