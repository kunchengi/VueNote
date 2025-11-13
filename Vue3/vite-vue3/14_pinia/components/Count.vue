<template>
    <div>
        <button @click="undo">撤销</button>
        <button @click="redo">恢复</button>
        <hr>
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
const { sum, square } = storeToRefs(calculateStore);

import { ref,reactive } from 'vue'
// const sum = ref(0);
const n = ref(1);
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

const record: any = reactive({
    list: [{...calculateStore.$state}],// 记录状态变化的数组，初始值为当前状态
    currentIndex: 0,// 当前记录的索引
    isApplyRecord: false,// 是否应用记录触发的状态变化
});

// 订阅状态变化
calculateStore.$subscribe((mutation, state) => {
    if (record.isApplyRecord) {
        record.isApplyRecord = false;
        return;
    }
    if (record.currentIndex === record.list.length - 1) {
        record.currentIndex++;
        record.list.push({ ...state });
    }else{
        record.list.splice(record.currentIndex + 1);
        record.currentIndex++;
        record.list.push({ ...state });
    }
})

// 撤销
const undo = () => {
    if (record.currentIndex === 0) {
        return;
    }
    record.currentIndex--;
    record.isApplyRecord = true;
    calculateStore.$patch(record.list[record.currentIndex]);
}
// 恢复
const redo = () => {
    if (record.currentIndex === record.list.length - 1) {
        return;
    }
    record.currentIndex++;
    record.isApplyRecord = true;
    calculateStore.$patch(record.list[record.currentIndex]);
}

</script>

<style scoped>
button {
    margin-left: 5px;
}
</style>