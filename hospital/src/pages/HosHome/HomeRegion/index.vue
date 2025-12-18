<template>
  <div class="home-region">
    <div class="home-region__content">
        <div class="home-region__label">地区：</div>
        <ul class="home-region__list">
            <li :class="{'home-region__item--active': selectedRegion === ''}" @click="changeRegion('')">全部</li>
            <li v-for="item in regionList" :key="item.value" :class="{'home-region__item--active': selectedRegion === item.value}" @click="changeRegion(item.value)">{{ item.name }}</li>
        </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="HomeRegion">
import { reqDict } from '@/api/home'
import type { DictResponseData, DictDataList } from '@/api/home/type'
import { onMounted, ref } from 'vue'

// 定义组件触发的事件
const emit = defineEmits(['changeRegion'])

// 存储北京各区列表
const regionList = ref<DictDataList>([]);
// 当前选中的地区
const selectedRegion = ref<string>('')

// 获取北京各区列表
const getRegionList = async () => {
    const res: DictResponseData = await reqDict('Beijing')
    if (res.code === 200) {
        regionList.value = res.data;
    }
}

onMounted(() => {
    getRegionList()
})

// 切换等级
const changeRegion = (region: string) => {
    selectedRegion.value = region;
    // 触发changeRegion事件，将选中的地区传递给父组件
    emit('changeRegion', region);
}
</script>

<style lang="scss" scoped>
.home-region{
    color: #7f7f7f;
    margin-top: 10px;
    .home-region__content{
        display: flex;
        .home-region__label{
            margin-right: 10px;
            width: 53px;
        }
        .home-region__list{
            display: flex;
            flex-wrap: wrap;
            li{
                margin-right: 10px;
                margin-bottom: 10px;
                &.home-region__item--active{
                    color: #55a6fe;
                }
                &:hover{
                    color: #55a6fe;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>