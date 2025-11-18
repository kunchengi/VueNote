<template>
    <div>
        <PhoneItem v-for="phone in phoneList" :key="phone.id" :phone="phone" />
    </div>
</template>

<script lang="ts" setup name="PhoneList">
import PhoneItem from '@/components/PhoneItem.vue'
import { type IPhone } from '@/types/index'

defineProps<{
    phoneList: IPhone[]
}>()

</script>

<style></style>