<template>
    <div>
        <!-- 映射后可以直接读取模块中的state和getters -->
        <h1>当前求和为：{{ sum }}</h1>
        <h1>当前求和的平方为：{{ square }}</h1>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <!-- 映射后可以直接使用模块中的mutations和actions方法 -->
        <button @click="increment(n)">+</button>
        <button @click="decrement(n)">-</button>
        <button @click="incrementIfOdd">当前求和为奇数再加</button>
        <button @click="incrementAsync(n)">异步加</button>
    </div>
</template>

<script>
// 引入常量模块
import { CALCULATE, INCREMENT, DECREMENT, INCREMENT_ASYNC } from '@/store/constant'
// 引入map辅助函数
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'Count',
    data() {
        return {
            n: 1// 用户选择的数字
        }
    },
    computed: {
        // 映射 calculate 模块的 state
        ...mapState(CALCULATE, ["sum"]),
        // 映射 calculate 模块的 getters
        ...mapGetters(CALCULATE, ["square"]),
    },
    methods: {
        // 映射 calculate 模块的 mutations
        ...mapMutations(CALCULATE, {
            increment: INCREMENT,
            decrement: DECREMENT
        }),
        // 映射 calculate 模块的 actions
        ...mapActions(CALCULATE, [INCREMENT_ASYNC]),
        // 本地方法
        // 当前求和为奇数再加
        incrementIfOdd() {
            if (this.sum % 2 !== 0) {
                this.increment(this.n)
            }
        }
    }
}
</script>

<style scoped>
button {
    margin-left: 5px;
}
</style>