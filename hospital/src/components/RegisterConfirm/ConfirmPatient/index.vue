<template>
    <el-card class="patient-container">
        <template #header>
            <div class="patient-header">
                <span>{{ props.isManager ? '就诊人管理' : '请点击选择就诊人' }}</span>
                <el-button type="primary" @click="handleAddPatient">添加就诊人</el-button>
            </div>
        </template>
        <div class="patient-list">
            <patient-card v-for="index in 4" :key="index" :isManager="props.isManager" />
        </div>

    </el-card>
</template>

<script setup lang="ts" name="ConfirmPatient">
import PatientCard from '../PatientCard/index.vue'
import { useRouter } from 'vue-router'

type Props = {
    isManager: boolean,
}

const props = defineProps<Props>()

const router = useRouter()

const handleAddPatient = () => {
    router.push({
        path: '/user/patientManage/edit'
    })
}

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