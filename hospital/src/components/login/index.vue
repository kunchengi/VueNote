<template>
  <div class="login">
    <el-dialog v-model="uiManageStore.showLogin" title="登录" width="800">
        <div>登录页</div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Login">
import useUiManageStore from "@/store/modules/uiManage";

const uiManageStore = useUiManageStore();

</script>

<style lang="scss" scoped>

</style>