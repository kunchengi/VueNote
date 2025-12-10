<template>
    <div class="tip">
        <!-- 常见科室的结构 -->
        <Department />
        <!-- 平台公共 -->
        <Notice v-for="item in noticeDatas" :key="item.id" :title="item.title" :noticeList="item.noticeList" />
    </div>
</template>

<script setup lang="ts" name="Tip">
import Department from '@/components/tip/deparment/index.vue'
import Notice from '@/components/tip/notice/index.vue'
import { reactive } from 'vue';

const noticeDatas = reactive<({
    id: number,
    title: string,
    noticeList: string[]
})[]>([
    {
        id: 1,
        title: '平台公告',
        noticeList: [
            '关于延长北京大学国际医院放假的通知',
            '北京中医药大学东方医院部分科室医生门诊医',
            '武汉总医院号源暂停更新通知',
        ]
    },
    {
        id: 2,
        title: '停诊公告',
        noticeList: [
            '中国人民解放军总医院第六医学中心呼吸内科门诊停诊公告',
            '首都医科大学附属北京潞河医院老年医学科门诊停诊公告',
            '中日友好医院中西医结合心内科门诊停诊公告',
        ]
    },
])



</script>

<style lang="scss" scoped>

</style>