<template>
  <div class="register-confirm">
    <h2 class="confirm-title">确认挂号信息</h2>
    <!-- 就诊人选择 -->
    <confirm-patient :isManager="false" />
    <!-- 挂号信息 -->
    <reservation-info />
    <div class="confirm-btn-container">
      <el-button type="primary" class="confirm-btn" @click="submit">确认挂号</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="RegisterConfirm">
import ConfirmPatient from '@/components/RegisterConfirm/ConfirmPatient/index.vue'
import ReservationInfo from '@/components/RegisterConfirm/ReservationInfo/index.vue'

// 提交挂号
const submit = () => {
    console.log('提交挂号')
}
</script>

<style lang="scss" scoped>
.register-confirm {
  .confirm-title {
    font-size: 24px;
    font-weight: bold;
  }
  .confirm-btn-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    .confirm-btn {
      width: 200px;
      padding: 20px;
    }
  }

}
</style>