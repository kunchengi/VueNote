<template>
  <div>
    <PhoneList :phoneList="phoneList" />
  </div>
</template>

<script lang="ts" setup name="App">
import PhoneList from '@/components/PhoneList.vue'
import { type IPhone } from '@/types/index'
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import emitter from '@/utils/emitter'

const phoneList: IPhone[] = reactive([
    {
        id: '1',
        name: 'iPhone 17',
        price: 5999
    },
    {
        id: '2',
        name: '小米 17',
        price: 4999
    },
    {
        id: '3',
        name: '华为 meta 50',
        price: 7999
    },
])

// 挂载完成后，监听 buyPhone 事件
onMounted(() => {
    emitter.on('buyPhone', (phone) => onBuyPhone(phone as IPhone))
})

// 卸载前，移除 buyPhone 事件监听，防止内存泄漏
onBeforeUnmount(() => {
    emitter.off('buyPhone')
})

// 处理购买事件
function onBuyPhone(phone: IPhone) {
    console.log(`购买了${phone.name}`)
}

</script>

<style scoped>
</style>
