<template>
    <div class="notice">
        <Header :title="title">
            <template #leftIcon>
                <i class="iconfont icon-tongzhi"></i>
            </template>
        </Header>
        <div class="content">
            <ul>
                <li v-for="(item, index) in noticeList" :key="index">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts" name="Notice">
import Header from '@/components/tip/header/index.vue'

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
.notice {
    color: #7f7f7f;
    margin-top: 20px;

    .content {
        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                margin-top: 20px;
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

    .iconfont {
        color: #2197EF;
    }
}
</style>