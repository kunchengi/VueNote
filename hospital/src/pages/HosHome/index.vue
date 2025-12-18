<template>
  <div>
    <!-- 轮播图 -->
    <home-carousel />
    <!-- 医院搜索框 -->
    <home-search />
    <!-- 底部展示医院的结构 -->
    <el-row :gutter="20">
      <el-col :span="20">
        <!-- 医院等级组件 -->
        <home-level @changeLevel="changeLevel" />
        <!-- 医院区域组件 -->
        <home-region @changeRegion="changeRegion" />
        <!-- 医院卡片列表 -->
        <div class="hos-home__card-list" v-if="hasHospitalArr.length > 0">
          <home-card class="hos-home__card-item" v-for="item in hasHospitalArr" :key="item.id" :hospitalInfo="item" />
        </div>
        <!-- 无数据提示 -->
        <el-empty v-else description="暂无数据" />
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pagination.pageNo"
          v-model:page-size="pagination.pageSize"
          :page-sizes="pagination.pageSizeOptions"
          layout="->, prev, pager, next, sizes, total"
          :total="pagination.total"
          @current-change="getHospitalInfo"
          @size-change="sizeChange"
        />
      </el-col>
      <el-col :span="4">
        <!-- 右侧结构 -->
        <home-tip />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="HosHome">
import HomeCarousel from './HomeCarousel/index.vue'
import HomeSearch from './HomeSearch/index.vue'
import HomeLevel from './HomeLevel/index.vue'
import HomeRegion from './HomeRegion/index.vue'
import HomeCard from './HomeCard/index.vue'
import HomeTip from './HomeTip/index.vue'

import { reactive, onMounted, ref } from 'vue'
import { reqHospital } from '@/api/home'
import type { Content, HospitalResponseData } from '@/api/home/type'

// 分页器需要的数据
const pagination = reactive({
  pageNo: 1,
  pageSize: 10,
  pageSizeOptions: [10, 20, 30, 40],
  disabled: false,
  layout: 'total, sizes, prev, pager, next, jumper',
  total: 13,
})

// 存储已有的医院列表
let hasHospitalArr = ref<Content>([]);
onMounted(() => {
  getHospitalInfo()
})

// 当前选择的医院等级，全部为''
const hostype = ref<string>('')
// 当前选择的地区，全部为''
const districtCode = ref<string>('')

// 获取医院列表
const getHospitalInfo = async () => {
  const result: HospitalResponseData = await reqHospital(pagination.pageNo,pagination.pageSize, hostype.value, districtCode.value);
  if(result.code === 200){
    hasHospitalArr.value = result.data.content;
    pagination.total = result.data.totalElements;
  }
}

// 分页器大小改变时触发
const sizeChange = () => {
  // 将当前页码设为第一页
  pagination.pageNo = 1;
  // 重新获取医院列表
  getHospitalInfo();
}

// 医院等级组件选择等级时触发
const changeLevel = (level: string) => {
  hostype.value = level;
  // 重新获取医院列表
  getHospitalInfo();
}

// 医院区域组件选择地区时触发
const changeRegion = (region: string) => {
  districtCode.value = region;
  // 重新获取医院列表
  getHospitalInfo();
}
</script>

<style lang="scss" scoped>
.hos-home__card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .hos-home__card-item {
    width: 48%;
    margin: 10px 0;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>