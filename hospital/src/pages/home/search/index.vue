<template>
  <div class="search">
    <el-autocomplete
      v-model="hosName"
      clearable
      placeholder="请输入医院名称"
      :fetch-suggestions="fetchSuggestions"
      :trigger-on-focus="false"
      @select="handleSelect"
    />
    <el-button type="primary" size="default" :icon="Search"/>
  </div>
</template>

<script setup lang="ts" name="Search">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { reqFindHospital } from '@/api/home'
import type { FindHospitalResponseData, Content } from '@/api/home/type'

// 初始化 Vue Router 实例
const router = useRouter()

// 搜索输入框的医院名称
const hosName = ref<string>('')

// 定义搜索医院名称的响应数据
const hospitalList = ref<Content>()

// 搜索医院名称
const searchHospital = async () => {
  // 校验输入框是否为空
  if (!hosName.value) {
    return
  }
  const res: FindHospitalResponseData = await reqFindHospital(hosName.value)
  if (res.code === 200) {
    hospitalList.value = res.data
  }
}

// 自动完成建议列表，当用户输入完会调用该函数，返回建议列表
const fetchSuggestions = async (queryString: string, cb:any): Promise<any> => {
  await searchHospital()
  if (queryString) {
    cb(hospitalList.value?.map(item => ({
      value: item.hosname || '',// 医院名称，用于显示在建议列表中
      hoscode: item.hoscode || ''// 医院编码，跳转详情页时使用
    })) || [])
  } else {
    cb([])
  }
}

// 处理选择建议项事件
const handleSelect = (item: Record<string, any>) => {
  // 跳转详情页，传递医院编码
  console.log('选择的医院编码:', item.hoscode);
  // 使用 Vue Router 跳转详情页，传递医院编码作为参数
  router.push({
    path: '/hospital',
    query: {
      hoscode: item.hoscode
    }
  })
}



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