<template>
  <div>
    <!-- 轮播图 -->
    <Carousel />
    <!-- 医院搜索框 -->
    <Search />
    <!-- 底部展示医院的结构 -->
    <el-row :gutter="20">
      <el-col :span="20">
        <!-- 医院等级组件 -->
        <Level />
        <!-- 医院区域组件 -->
        <Region />
        <!-- 医院卡片列表 -->
        <div class="card-container">
          <Card class="card-item" v-for="item in hasHospitalArr" :key="item.id" :hospitalInfo="item" />
        </div>
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
      <el-col :span="4">右侧内容</el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="Home">
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from './level/index.vue'
import Region from './region/index.vue'
import Card from './card/index.vue'

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

// 获取医院列表
const getHospitalInfo = async () => {
  const result: HospitalResponseData = await reqHospital(pagination.pageNo,pagination.pageSize);
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
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .card-item {
    width: 48%;
    margin: 10px 0;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>