<template>
    <div class="tip-department">
        <tip-header title="常见科室">
            <template #titleIcon>
                <i class="iconfont icon-icon"></i>
            </template>
        </tip-header>
        <ul class="tip-department__list">
            <li v-for="item in departmentList" :key="item.id" class="tip-department__item">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts" name="TipDepartment">
import TipHeader from '@/components/HosTip/TipHeader/index.vue'
import { reactive } from 'vue';

const departmentList = reactive([
    {
        name: "神经内科",
        id: 1
    },
    {
        name: "消化内科",
        id: 2
    },
    {
        name: "呼吸内科",
        id: 3
    },
    {
        name: "内科",
        id: 4
    },
    {
        name: "神经外科",
        id: 5
    },
    {
        name: "妇科",
        id: 6
    },
    {
        name: "产科",
        id: 7
    },
    {
        name: "儿科",
        id: 8
    },
]);
</script>

<style lang="scss" scoped>
.tip-department {
    color: #7f7f7f;

    .tip-department__list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .tip-department__item {
            width: 40%;
            margin-top: 20px;
            cursor: pointer;
            &:hover {
                color: #55a6fe;
            }
        }
    }

    .iconfont {
        color: #13227a;
    }
}
</style>