<template>
    <div class="top-title">
        <div class="title">{{ hosname }}</div>
        <div class="hostype">
            <i class="iconfont icon-dianzan"></i>
            <span>{{ hostypeString }}</span>
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
.top-title {
    display: flex;
    align-items: center;
    margin: 20px 0;

    .title {
        font-size: 30px;
        font-weight: bold;
    }

    .hostype {
        margin-left: 10px;

        .iconfont {
            font-size: 20px;
            color: #5D5D5D;
        }

        span {
            color: #7f7f7f;
            margin-left: 5px;
        }
    }
}
</style>