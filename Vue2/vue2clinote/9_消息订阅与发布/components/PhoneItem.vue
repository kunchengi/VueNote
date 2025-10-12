<template>
    <div>
        <span>名称：{{ phone.name }}</span>
        <span>价格：{{ phone.price }}</span>
        <button @click="handleClick">点击购买</button>
    </div>
</template>

<script>
import pubsub from 'pubsub-js'
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
            pubsub.publish('buyPhone', this.phone)
        }
    }
}
</script>

<style></style>