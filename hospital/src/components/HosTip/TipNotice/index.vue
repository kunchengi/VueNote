<template>
    <div class="tip-notice">
        <tip-header :title="title">
            <template #titleIcon>
                <i class="iconfont icon-tongzhi"></i>
            </template>
        </tip-header>
        <ul class="tip-notice__list">
            <li v-for="(item, index) in noticeList" :key="index" class="tip-notice__item">{{ item }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts" name="TipNotice">
import TipHeader from '@/components/HosTip/TipHeader/index.vue'

const props = defineProps({
    title: {
        type: String,
        default: '公告'
    },
    noticeList: {
        type: Array,
        default: () => []
    }
})
</script>

<style lang="scss" scoped>
.tip-notice {
    color: #7f7f7f;
    margin-top: 20px;

    .tip-notice__list {
        display: flex;
        flex-wrap: wrap;

        .tip-notice__item {
            margin-top: 20px;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .iconfont {
        color: #2197EF;
    }
}
</style>