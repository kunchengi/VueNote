<template>
    <div>
        <span>名称：{{ phone.name }}</span>
        <span>价格：{{ phone.price }}</span>
        <button @click="handleClick">点击购买</button>
    </div>
</template>

<script>
export default {
    name: 'PhoneItem',
    props: {
        phone: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        handleClick() {
            // 触发 buyPhone 事件
            this.$bus.$emit('buyPhone', this.phone);
            // 触发 buy 事件，该事件只能触发一次
            this.$bus.$emit('buy', this.phone);
        }
    }
}
</script>

<style></style>