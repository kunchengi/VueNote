<template>
    <div>
        <PhoneItem v-for="phone in phoneList" :key="phone.id" :phone="phone" />
    </div>
</template>

<script>
import PhoneItem from './PhoneItem.vue'

export default {
    name: 'PhoneList',
    components: {
        PhoneItem
    },
    props: {
        phoneList: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style></style>