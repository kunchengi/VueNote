<template>
    <el-card :class="['patient-card', { 'patient-card--selected': isSelected }]" shadow="hover">
        <template #header>
            <div class="patient-header">
                <div class="patient-header__left">
                    <span :class="['patient-name', { 'patient-name--selected': isSelected }]" class="patient-name">{{ patientInfo.name }}</span>
                    <el-tag type="primary">{{ patientInfo.isInsurance ? '医保' : '自费' }}</el-tag>
                </div>
                <div>
                    <el-button class="patient-edit" circle>
                        <el-icon size="16">
                            <Edit />
                        </el-icon>
                    </el-button>
                    <el-button class="patient-delete" circle v-if="isManager">
                        <el-icon size="16">
                            <Delete />
                        </el-icon>
                    </el-button>
                </div>

            </div>
        </template>
        <div class="patient-info">
            <div class="patient-item">
                <span>证件类型：</span>
                <p class="patient-value">{{ patientInfo.certificateType === 0 ? '身份证' : '护照' }}</p>
            </div>
            <div class="patient-item">
                <span>证件号码：</span>
                <p class="patient-value">{{ patientInfo.certificateNumber }}</p>
            </div>
            <div class="patient-item">
                <span>患者性别：</span>
                <p class="patient-value">{{ patientInfo.sex === 1 ? '男' : '女' }}</p>
            </div>
            <div class="patient-item">
                <span>出生日期：</span>
                <p class="patient-value">{{ patientInfo.birthDay }}</p>
            </div>
            <div class="patient-item">
                <span>手机号码：</span>
                <p class="patient-value">{{ patientInfo.phone }}</p>
            </div>
            <div class="patient-item">
                <span>婚姻状况：</span>
                <p class="patient-value">{{ patientInfo.isMarry === 1 ? '已婚' : '未婚' }}</p>
            </div>
            <div class="patient-item">
                <span>当前住址：</span>
                <p class="patient-value">{{ patientInfo.address }}</p>
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts" name="PatientCard">
import { Edit, Delete } from '@element-plus/icons-vue'
import type { PatientInfo } from '@/api/user/type'

type Props = {
    isManager: boolean,// 是否是就诊人管理页面
    patientInfo: PatientInfo,// 就诊人信息
    isSelected: boolean,// 是否选中
}

const props = defineProps<Props>()

</script>

<style lang="scss" scoped>
.patient-card {
    width: 32%;
    margin: 5px;
    cursor: pointer;

    .patient-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .patient-header__left {
            display: flex;
            align-items: center;

            .patient-name {
                margin-right: 5px;
                font-size: 18px;
            }

            .patient-name--selected {
                color: #55a6fe;
            }
        }



        .patient-edit {
            color: #fff;
            background-color: #55a6fe;
        }

        .patient-delete {
            color: #fff;
            background-color: #ff4d4f;
        }
    }

    .patient-info {
        margin-top: 10px;
        font-size: 16px;

        .patient-item {
            margin: 10px 0;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .patient-value {
                color: #7f7f7f;
            }
        }
    }
}

.patient-card--selected {
    box-shadow: 0 0 10px rgba(85, 166, 254, 0.5);
}
</style>