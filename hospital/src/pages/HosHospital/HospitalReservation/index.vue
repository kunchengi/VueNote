<template>
    <div class="hospital-reservation">
        <div class="hospital-reservation__title">
            <span>北京人民医院</span>
            <span>|</span>
            <span>专科</span>
            <span>·</span>
            <span>神经内科</span>
        </div>
        <div class="hospital-reservation__content">
            <div class="hospital-reservation__time">
                <span>2025年12月</span>
            </div>
            <div class="hospital-reservation__list">
                <el-card 
                    style="width: 180px" 
                    header="2025-12-2 周二" 
                    :header-class="true ? 'el-card__header--disabled' : ''"
                    :body-class="true ? 'el-card__body--disabled' : ''"
                    :shadow="true ? 'never' : 'hover'">
                    <span>停止挂号</span>
                </el-card>
                <el-card 
                    style="width: 180px" 
                    header="2025-12-2 周二" 
                    :header-class="false ? 'el-card__header--disabled' : ''" 
                    :shadow="false ? 'never' : 'hover'">
                    <span>停止挂号</span>
                </el-card>
                <el-card 
                    style="width: 180px" 
                    header="2025-12-2 周二" 
                    :header-class="false ? 'el-card__header--disabled' : ''" 
                    :shadow="false ? 'never' : 'hover'">
                    <span>停止挂号</span>
                </el-card>
                <el-card 
                    style="width: 180px" 
                    header="2025-12-2 周二" 
                    :header-class="false ? 'el-card__header--disabled' : ''" 
                    :shadow="false ? 'never' : 'hover'">
                    <span>停止挂号</span>
                </el-card>
                <el-card 
                    style="width: 180px" 
                    header="2025-12-2 周二" 
                    :header-class="false ? 'el-card__header--disabled' : ''" 
                    :shadow="false ? 'never' : 'hover'">
                    <span>停止挂号</span>
                </el-card>
            </div>
             <el-pagination :page-size="5" layout="prev, pager, next" :total="20" />
        </div>
    </div>
</template>

<script setup lang="ts" name="HospitalReservation">

</script>

<style lang="scss" scoped>
.hospital-reservation {
    margin-top: 20px;
    color: #7f7f7f;

    .hospital-reservation__title {
        span {
            margin-right: 10px;
        }
    }

    .hospital-reservation__content {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .hospital-reservation__time {
            font-weight: bold;
            margin-bottom: 20px;
        }

        .hospital-reservation__list {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            :deep(.el-card) {
                cursor: pointer;
                color: #7f7f7f;

                &:hover {
                    color: #55a6fe;
                }
            }

            :deep(.el-card__header) {
                text-align: center;
                background-color: #d3e8ff;
                font-weight: bold;
            }

            :deep(.el-card__header--disabled) {
                background-color: #f5f5f5;
                color: #7f7f7f;
                cursor: not-allowed;
            }

            :deep(.el-card__body) {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            :deep(.el-card__body--disabled) {
                color: #7f7f7f;
                cursor: not-allowed;
            }
        }
    }
}
</style>