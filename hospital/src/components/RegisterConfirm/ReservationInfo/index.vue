<template>
    <el-card class="reservation-info" header="挂号信息">
        <el-descriptions :column="2" border>
            <el-descriptions-item v-for="(item, index) in reservationInfos" :key="index">
                <template #label>
                    <div class="cell-item">
                        {{ item.label }}
                    </div>
                </template>
                <span :style="{ color: item.key === 'amount' ? '#f5a824' : '#7f7f7f' }">
                    {{ item.value }}
                </span>
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup lang="ts" name="ReservationInfo">
const reservationInfos = [
    {
        label: '就诊日期',
        key: 'reserveDate',
        value: '2026-01-13 周二 下午',
    },
    {
        label: '就诊医院',
        key: 'hosName',
        value: '北京人民医院',
    },
    {
        label: '就诊科室',
        key: 'deptName',
        value: '神经内科',
    },
    {
        label: '医生姓名',
        key: 'docName',
        value: '张三',
    },
    {
        label: '医生职称',
        key: 'docTitle',
        value: '主任医师',
    },
    {
        label: '挂号费',
        key: 'amount',
        value: '36',
    },
    {
        label: '医师专长',
        key: 'skill',
        value: '擅长神经内科相关疾病的诊治',
    }
]
</script>

<style lang="scss" scoped></style>