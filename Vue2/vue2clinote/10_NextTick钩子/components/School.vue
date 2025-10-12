<template>
    <div>
        <h1 ref="schoolName" :style="{ color: color }">学校名称：{{ name }}</h1>
        <button @click="changeColor">修改字体颜色（nextTick回调函数方式）</button>
        <button @click="changeColor1">修改字体颜色（nextTick Promise 方式）</button>
        <button @click="changeColor2">修改字体颜色（nextTick async/await 方式）</button>
        <button @click="changeColor3">修改字体颜色（全局nextTick）</button>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    name: 'School',
    data() {
        return {
            name: '清华大学',
            color: 'red',
        }
    },
    methods: {
        changeColor() {
            // 修改颜色体现异步更新问题
            this.color = 'blue';
            // 由于 Vue 的更新是异步的，此时ref中的数据还未更新
            console.log(this.$refs.schoolName.style.color); // red
            // 在DOM更新后，执行回调函数
            this.$nextTick(() => {
                console.log('回调函数');
                console.log(this.$refs.schoolName.style.color); // blue
            })
        },
        changeColor1() {
            // 修改颜色体现异步更新问题
            this.color = 'green';
            // 由于 Vue 的更新是异步的，此时ref中的数据还未更新
            console.log(this.$refs.schoolName.style.color); // red
            // 在DOM更新后，执行promise回调函数
            this.$nextTick().then(() => {
                console.log('promise');
                console.log(this.$refs.schoolName.style.color); // green
            })
        },
        async changeColor2() {
            // 修改颜色体现异步更新问题
            this.color = 'yellow';
            // 由于 Vue 的更新是异步的，此时ref中的数据还未更新
            console.log(this.$refs.schoolName.style.color); // red
            // 在DOM更新后，执行async/await回调函数
            await this.$nextTick()
            console.log('async/await');
            console.log(this.$refs.schoolName.style.color); // yellow
        },
        changeColor3() {
            // 修改颜色体现异步更新问题
            this.color = 'orange';
            // 由于 Vue 的更新是异步的，此时ref中的数据还未更新
            console.log(this.$refs.schoolName.style.color); // red
            // 在DOM更新后，执行全局nextTick回调函数
            Vue.nextTick(() => {
                console.log('全局nextTick');
                console.log(this.$refs.schoolName.style.color); // orange
            })
        }
    }
}
</script>

<style></style>