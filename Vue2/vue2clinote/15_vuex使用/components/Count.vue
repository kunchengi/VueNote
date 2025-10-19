<template>
    <div>
        <h1>当前求和为：{{ sum }}</h1>
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
export default {
    name: 'Count',
    data() {
        return {
            sum: 0,
            n: 1// 用户选择的数字
        }
    },
    methods: {
        increment() {
            this.sum += this.n
        },
        decrement() {
            this.sum -= this.n
        },
        incrementIfOdd() {
            if (this.sum % 2 !== 0) {
                this.sum += this.n
            }
        },
        incrementAsync() {
            setTimeout(() => {
                this.sum += this.n
            }, 1000)
        }
    }
}
</script>

<style scoped>
button {
    margin-left: 5px;
}
</style>