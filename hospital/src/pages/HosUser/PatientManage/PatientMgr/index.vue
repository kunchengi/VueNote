<template>
    <div class="patient-mgr">
        <confirm-patient :isManager="true" />
    </div>
</template>

<script setup lang="ts" name="PatientMgr">
import ConfirmPatient from '@/components/RegisterConfirm/ConfirmPatient/index.vue'
</script>

<style lang="scss" scoped></style>