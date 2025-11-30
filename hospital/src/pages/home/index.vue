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
</script>

<style lang="scss" scoped>

</style>