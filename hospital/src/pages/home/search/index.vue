<template>
  <div class="search">
    <el-autocomplete
    clearable
    placeholder="请输入医院名称"
    />
    <el-button type="primary" size="default" :icon="Search"/>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.search {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;

    :deep(.el-autocomplete){
        width: 600px;
        margin-right: 10px;
    }
}
</style>