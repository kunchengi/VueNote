<template>
    <div class="logo-img">
        <img :src="logoData" alt="医院logo">
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
.logo-img {
    margin-top: 20px;
    width: 80px;
    img {
        width:80px;
        height: 80px;
        border-radius: 50%;
    }
}
</style>