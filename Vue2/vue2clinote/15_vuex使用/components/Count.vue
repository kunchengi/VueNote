<template>
    <div>
        <!-- 使用$store.state获取状态 -->
        <h1>当前求和为：{{ $store.state.sum }}</h1>
        <!-- 使用$store.getters获取计算属性 -->
        <h1>当前求和的平方为：{{ $store.getters.square }}</h1>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="incrementIfOdd">当前求和为奇数再加</button>
        <button @click="incrementAsync">异步加</button>
    </div>
</template>

<script>
import * as constant from '@/store/constant'

export default {
    name: 'Count',
    data() {
        return {
            sum: 0,
            n: 1// 用户选择的数字
        }
    },
    methods: {
        // 加法
        increment() {
            // 调用commit方法触发mutations中的INCREMENT方法
            this.$store.commit(constant.INCREMENT, this.n)
        },
        // 减法
        decrement() {
            this.$store.commit(constant.DECREMENT, this.n)
        },
        // 当前求和为奇数再加
        incrementIfOdd() {
            if (this.$store.state.sum % 2 !== 0) {
                this.$store.commit(constant.INCREMENT, this.n)
            }
        },
        // 异步加法
        async incrementAsync() {
            // 调用dispatch方法触发actions中的incrementAsync方法
            await this.$store.dispatch(constant.INCREMENT_ASYNC, this.n);
            console.log(this.$store.state.sum);// 最新的求和
        }
    }
}
</script>

<style scoped>
button {
    margin-left: 5px;
}
</style>