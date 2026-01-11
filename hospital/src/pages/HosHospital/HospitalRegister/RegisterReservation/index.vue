<template>
    <div class="hospital-reservation">
        <div class="hospital-reservation__title">
            <span>{{ scheduleBaseInfo?.hosname || '' }}</span>
            <span>|</span>
            <span>{{ scheduleBaseInfo?.bigname || '' }}</span>
            <span>·</span>
            <span>{{ scheduleBaseInfo?.depname || '' }}</span>
        </div>
        <div class="hospital-reservation__content">
            <div class="hospital-reservation__time">
                <span>{{ scheduleBaseInfo?.workDateString || '' }}</span>
            </div>
            <div class="hospital-reservation__list">
                <el-card 
                    style="width: 180px" 
                    :header="getCardTitle(item)" 
                    :header-class="getDisabled(item) ? 'el-card__header--disabled' : ''"
                    :body-class="getDisabled(item) ? 'el-card__body--disabled' : ''"
                    :shadow="getDisabled(item) ? 'never' : 'hover'"
                    :class="{'el-card__header--selected': item.workDate === selectedWorkDate}"
                    v-for="item in scheduleList"
                    :key="item.id"
                    @click="onClickDate(item)"
                >
                    <span>{{ getCardContent(item) }}</span>
                </el-card>
            </div>
             <el-pagination
                v-model:current-page="paginationData.page"
                :page-size="paginationData.limit"
                layout="prev, pager, next"
                :total="paginationData.total"
                @current-change="loadScheduleList"
            />
        </div>
        <div class="hospital-reservation__detail">
            <SelectDoctor v-if="morningScheduleList.length > 0" :is-morning="true" :schedule-list="morningScheduleList" />
            <SelectDoctor v-if="afternoonScheduleList.length > 0" :is-morning="false" :schedule-list="afternoonScheduleList" />
        </div>
    </div>
</template>

<script setup lang="ts" name="RegisterReservation">
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { useRoute } from 'vue-router';
import { reqBookScheduleList, reqFindScheduleList } from '@/api/hospital';
import { type BookSchedulelListRequestData, type BookSchedulelListResponseData, type BookSchedulelData, type BookScheduleBaseData, type FindScheduleListRequestData, type FindScheduleListResponseData, type ScheduleData } from '@/api/hospital/type';
import { onMounted, ref, reactive, computed } from 'vue';
import SelectDoctor from '@/components/HosReservation/SelectDoctor/index.vue';

dayjs.locale('zh-cn')

const route = useRoute();

// 分页数据
const paginationData = reactive({
    page: 1,
    limit: 5,
    total: 0,
})

// 预约挂号列表
const scheduleList = ref<BookSchedulelData[]>([]);

// 预约挂号列表基础数据
const scheduleBaseInfo = ref<BookScheduleBaseData>({} as BookScheduleBaseData);

onMounted(() => {
    loadScheduleList();
})

// 加载预约挂号列表
const loadScheduleList = async () => {
    const reqParams:BookSchedulelListRequestData = {
        page: paginationData.page,
        limit: paginationData.limit,
        hoscode: route.query.hoscode as string,
        depcode: route.query.depcode as string,
    }
    const res:BookSchedulelListResponseData = await reqBookScheduleList(reqParams);
    if(res.code === 200) {
        scheduleList.value = res.data.bookingScheduleList;
        scheduleBaseInfo.value = res.data.baseMap;
        paginationData.total = res.data.total || 0;
    }
}

// 获取预约挂号列表的标题
const getCardTitle = (item: BookSchedulelData) => {
    const date = dayjs(item.workDate);
    const day = date.format('YYYY-MM-DD dddd');
    return day.replace('星期', '周');
}

// 获取预约挂号对应日期的内容
const getCardContent = (item: BookSchedulelData) => {
    let content = ''
    if(item.status === -1) {
        content = '停止挂号'
    }else if(item.status === 0) {
        if(item.availableNumber === 0) {
            content = '已满诊'
        }else {
            content = `余号：${item.availableNumber}`
        }
    }else if(item.status === 1) {
        content = '即将放号'
    }
    return content
}

// 预约挂号对应日期是否禁用
const getDisabled = (item: BookSchedulelData) => {
    return item.status !== 0;
}

// 当前选择的日期
const selectedWorkDate = ref('');

// 当前选择的日期排班列表
const selectedScheduleList = ref<ScheduleData[]>([]);

// 上午排班列表
const morningScheduleList = computed(() => {
    return selectedScheduleList.value.filter(item => item.workTime === 0);
})

// 下午排班列表
const afternoonScheduleList = computed(() => {
    return selectedScheduleList.value.filter(item => item.workTime === 1);
})

// 点击预约挂号日期
const onClickDate = async (item: BookSchedulelData) => {
    if(getDisabled(item)) {
        return;
    }
    const reqParams:FindScheduleListRequestData = {
        hoscode: route.query.hoscode as string,
        depcode: route.query.depcode as string,
        workDate: item.workDate,
    }
    const res:FindScheduleListResponseData = await reqFindScheduleList(reqParams);
    if(res.code === 200) {
        selectedWorkDate.value = item.workDate;
        selectedScheduleList.value = res.data || [];
    }
}

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
            justify-content: center;
            margin-bottom: 20px;

            :deep(.el-card) {
                cursor: pointer;
                color: #7f7f7f;
                margin: 0 5px;
                transition: all 0.3s;

                &:hover {
                    color: #55a6fe;
                }
            }

            .el-card__header--selected {
                color: #55a6fe;
                transform: scale(1.1);
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