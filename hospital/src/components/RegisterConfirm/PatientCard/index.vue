<template>
    <el-card :class="['patient-card', { 'patient-card--selected': true }]" shadow="hover">
        <template #header>
            <div class="patient-header">
                <div class="patient-header__left">
                    <span class="patient-name">张三</span>
                    <el-tag type="primary">医保</el-tag>
                </div>
                <div>
                    <el-button class="patient-edit" circle>
                        <el-icon size="16">
                            <Edit />
                        </el-icon>
                    </el-button>
                    <el-button class="patient-delete" circle v-if="props.isManager">
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
                <p class="patient-value">身份证</p>
            </div>
            <div class="patient-item">
                <span>证件号码：</span>
                <p class="patient-value">44030419900101001X</p>
            </div>
            <div class="patient-item">
                <span>患者性别：</span>
                <p class="patient-value">男</p>
            </div>
            <div class="patient-item">
                <span>出生日期：</span>
                <p class="patient-value">1990-01-01</p>
            </div>
            <div class="patient-item">
                <span>手机号码：</span>
                <p class="patient-value">13800000000</p>
            </div>
            <div class="patient-item">
                <span>婚姻状况：</span>
                <p class="patient-value">未婚</p>
            </div>
            <div class="patient-item">
                <span>当前住址：</span>
                <p class="patient-value">440304北京市海淀区</p>
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts" name="PatientCard">
import { Edit, Delete } from '@element-plus/icons-vue'

type Props = {
    isManager: boolean,
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