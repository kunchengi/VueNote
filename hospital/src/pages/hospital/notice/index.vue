<template>
  <div class="notice">
    <h1>{{ hospitalDetailStore.hosname }}预约通知</h1>
    <div v-html="hospitalDetailStore.article"></div>
  </div>
</template>

<script setup lang="ts" name="Notice">
import { onMounted } from 'vue'
import useHospitalDetailStore from '@/store/modules/hospitalDetail'

const hospitalDetailStore = useHospitalDetailStore()

onMounted(() => {
  hospitalDetailStore.getArticleByFilename('noticeArticle.html')
})
</script>

<style lang="scss" scoped>
.notice {
  padding: 20px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    color: #2F57AE;
  }
}
</style>