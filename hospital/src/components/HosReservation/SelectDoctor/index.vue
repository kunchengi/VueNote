<template>
  <div class="select-doctor">
    <div class="select-doctor__title">
        <i :class="['iconfont', isMorning ? 'icon-shangwu' : 'icon-xiawu']"></i>
        <span>{{ isMorning ? '上午' : '下午' }}号源</span>
    </div>
    <div class="select-doctor__list">
        <div class="select-doctor__item" v-for="schedule in scheduleList" :key="schedule.id">
            <div class="select-doctor__info">
                <div class="select-doctor__name">
                    <span>{{ schedule.level }}</span>
                    <span>|</span>
                    <span>{{ schedule.docName }}</span>   
                </div>
                <div class="select-doctor__intro">
                    <span>{{ schedule.skill }}</span>
                </div>
            </div>
            <div class="select-doctor__select">
                <span>￥{{ schedule.amount }}</span>
                <el-button type="primary" @click="selectDoctor(schedule)">剩余{{ schedule.availableNumber }}</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="SelectDoctor">
import { useRouter, useRoute } from 'vue-router';
import { type ScheduleData } from '@/api/hospital/type';

const router = useRouter();
const route = useRoute();

type PropsType = {
    isMorning: boolean,// 是否上午
    scheduleList: ScheduleData[]// 排班列表
}

const props = defineProps<PropsType>()

// 选择医生
const selectDoctor = (schedule: ScheduleData) => {
    router.push({
        path: '/hospital/register/confirm',
        query: {
            hoscode: route.query.hoscode,
            depcode: route.query.depcode,
            scheduleId: schedule.id
        }
    })
}
</script>

<style lang="scss" scoped>
.select-doctor {
    color: #7f7f7f;
    .select-doctor__title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        .iconfont {
            color: #55a6fe;
            margin-right: 5px;
        }
    }
    .select-doctor__list {
        .select-doctor__item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #e5e5e5;
            .select-doctor__info {
                width: 80%;
                .select-doctor__name {
                    font-size: 18px;
                    color: #55a6fe;
                    margin-bottom: 20px;
                    span {
                        margin-right: 5px;
                    }
                }
                .select-doctor__intro {
                   margin-bottom: 20px;
                }
            }
            .select-doctor__select {
                span {
                    color: #f5a824;
                    margin-right: 20px;
                }
            }
        }
    }
}
</style>