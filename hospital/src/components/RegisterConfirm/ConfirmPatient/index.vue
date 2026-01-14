<template>
    <el-card class="patient-container">
        <template #header>
            <div class="patient-header">
                <span>请点击选择就诊人</span>
                <el-button type="primary">添加就诊人</el-button>
            </div>
        </template>
        <div class="patient-list">
            <patient-card v-for="index in 4" :key="index" :isManager="props.isManager" />
        </div>

    </el-card>
</template>

<script setup lang="ts" name="ConfirmPatient">
import PatientCard from '../PatientCard/index.vue'

type Props = {
    isManager: boolean,
}

const props = defineProps<Props>()

</script>

<style lang="scss" scoped>
.patient-container {
    width: 100%;
    margin: 20px 0;

    .patient-header {
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .patient-list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
}
</style>