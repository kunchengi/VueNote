<template>
  <div class="home-level">
    <h2>医院等级</h2>
    <div class="home-level__content">
        <div class="home-level__label">等级：</div>
        <ul class="home-level__list">
            <li :class="{'home-level__item--active': selectedLevel === ''}" @click="changeLevel('')">全部</li>
            <li v-for="item in hospitalLevelList" :key="item.value" :class="{'home-level__item--active': selectedLevel === item.value}" @click="changeLevel(item.value)">{{ item.name }}</li>
        </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="HomeLevel">
import { reqDict } from '@/api/home'
import type { DictResponseData, DictDataList } from '@/api/home/type'
import { onMounted, ref } from 'vue'

// 定义组件触发的事件
const emit = defineEmits(['changeLevel'])

// 存储医院等级列表
const hospitalLevelList = ref<DictDataList>([]);
// 当前选中的等级
const selectedLevel = ref<string>('')

// 获取医院等级列表
const getLevelList = async () => {
    const res: DictResponseData = await reqDict('Hostype')
    if (res.code === 200) {
        hospitalLevelList.value = res.data;
    }
}

onMounted(() => {
    getLevelList()
})

// 切换等级
const changeLevel = (level: string) => {
    selectedLevel.value = level;
    // 触发changeLevel事件，将选中的等级传递给父组件
    emit('changeLevel', level);
}
</script>

<style lang="scss" scoped>
.home-level{
    color: #7f7f7f;
    h2{
        font-size: 20px;
        font-weight: 900;
        margin: 10px 0;
    }

    .home-level__content{
        display: flex;
        .home-level__label{
            margin-right: 10px;
        }
        .home-level__list{
            display: flex;
            li{
                margin-right: 10px;
                &.home-level__item--active{
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