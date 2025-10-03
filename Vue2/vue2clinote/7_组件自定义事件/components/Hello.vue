<template>
    <div>
        你好
        <button @click="handleClick">点一下，给父组件发送数据</button>
    </div>
</template>

<script>
export default {
    name: 'Hello',
    props: {
        email: String
    },
    methods: {
        handleClick() {
            // 在子组件中触发事件
            this.$emit('notify', {
                id: 1,
                name: '张三'
            });
        }
    }
}
</script>

<style></style>