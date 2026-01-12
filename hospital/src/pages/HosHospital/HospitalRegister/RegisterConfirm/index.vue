<template>
  <div class="register-confirm">
    <h2 class="confirm-title">确认挂号信息</h2>
    <!-- 就诊人选择 -->
    <confirm-patient />
  </div>
</template>

<script setup lang="ts" name="RegisterConfirm">
import ConfirmPatient from '@/components/RegisterConfirm/ConfirmPatient/index.vue'

</script>

<style lang="scss" scoped>
.register-confirm {
  .confirm-title {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>