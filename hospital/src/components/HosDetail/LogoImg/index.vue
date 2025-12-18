<template>
    <div class="detail-logo">
        <img :src="logoData" alt="医院logo" class="detail-logo__img">
    </div>
</template>

<script setup lang="ts" name="LogoImg">

const props = defineProps({
    logoData: {
        type: String,
        default: ''
    }
})
</script>

<style lang="scss" scoped>
.detail-logo {
    margin-top: 20px;
    width: 80px;
    .detail-logo__img {
        width:80px;
        height: 80px;
        border-radius: 50%;
    }
}
</style>