<template>
    <div>
        <span>名称：{{ phone.name }}</span>
        <span>价格：{{ phone.price }}</span>
        <button @click="handleClick">点击购买</button>
    </div>
</template>

<script lang="ts" setup name="PhoneItem">
import emitter from '@/utils/emitter'
const props = defineProps({
    phone: {
        type: Object,
        default: () => ({})
    }
})
const handleClick = () => {
    // 点击购买按钮，触发 buyPhone 事件
    emitter.emit('buyPhone', props.phone)
}
</script>

<style></style>