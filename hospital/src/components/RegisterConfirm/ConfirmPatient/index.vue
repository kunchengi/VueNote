<template>
    <el-card class="patient-container">
        <template #header>
            <div class="patient-header">
                <span>{{ props.isManager ? '就诊人管理' : '请点击选择就诊人' }}</span>
                <el-button type="primary" @click="handleAddPatient">添加就诊人</el-button>
            </div>
        </template>
        <div class="patient-list">
            <patient-card 
                v-for="item in patientList" 
                :key="item.id" 
                :isManager="props.isManager" 
                :patientInfo="item" 
                :isSelected="item.id === selectedPatientId" 
                @click="handleSelectPatient(item.id!)"
            />
            <!-- <patient-card v-for="index in 4" :key="index" :isManager="props.isManager" /> -->
        </div>

    </el-card>
</template>

<script setup lang="ts" name="ConfirmPatient">
import { ref, onMounted } from 'vue'
import PatientCard from '../PatientCard/index.vue'
import type { PatientInfo } from '@/api/user/type'
import { getPatientList } from '@/api/user'
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

// 就诊人信息列表
const patientList = ref<PatientInfo[]>([])

// 加载就诊人信息列表
const loadPatientList = async () => {
    const res = await getPatientList()
    if (res.code === 200) {
        patientList.value = res.data || []
    }
}

// 组件挂载时加载就诊人信息列表
onMounted(() => {
    loadPatientList()
})

// 选中就诊人ID
const selectedPatientId = ref<string>('')

// 处理选择就诊人
const handleSelectPatient = (id: string) => {
    // 就诊人管理模式下，不处理选择
    if(props.isManager) return;
    selectedPatientId.value = id;
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