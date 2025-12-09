<template>
  <div class="region">
    <div class="content">
        <div class="left">地区：</div>
        <ul class="right">
            <li :class="{'active': selectedRegion === ''}" @click="changeRegion('')">全部</li>
            <li v-for="item in regionList" :key="item.value" :class="{'active': selectedRegion === item.value}" @click="changeRegion(item.value)">{{ item.name }}</li>
        </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="Region">
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
.region{
    color: #7f7f7f;
    margin-top: 10px;
    .content{
        display: flex;
        .left{
            margin-right: 10px;
            width: 53px;
        }
        .right{
            display: flex;
            flex-wrap: wrap;
            li{
                margin-right: 10px;
                margin-bottom: 10px;
                &.active{
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