<template>
    <div class="detail-title">
        <div class="detail-title__name">{{ hosname }}</div>
        <div class="detail-title__hostype">
            <i class="iconfont icon-dianzan"></i>
            <span class="detail-title__hostype-text">{{ hostypeString }}</span>
        </div>
    </div>
</template>

<script setup lang="ts" name="TopTitle">

const props = defineProps({
    hosname: {
        type: String,
        default: ''
    },
    hostypeString: {
        type: String,
        default: ''
    }
})
</script>

<style lang="scss" scoped>
.detail-title {
    display: flex;
    align-items: center;
    margin: 20px 0;

    .detail-title__name {
        font-size: 30px;
        font-weight: bold;
    }

    .detail-title__hostype {
        margin-left: 10px;

        .iconfont {
            font-size: 20px;
            color: #5D5D5D;
        }

        .detail-title__hostype-text {
            color: #7f7f7f;
            margin-left: 5px;
        }
    }
}
</style>