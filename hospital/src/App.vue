<template>
  <div class="container">
    <!-- 引入顶部全局组件 -->
    <hos-top />
    <!-- 展示路由组件的区域 -->
     <div class="content">
        <router-view />
     </div>
     <!-- 引入登录全局组件 -->
     <hos-login v-if="uiManageStore.showLogin" />
     <!-- 引入底部全局组件 -->
     <hos-bottom />
  </div>
</template>

<script setup lang="ts">
import useUiManageStore from "@/store/modules/uiManage";
const uiManageStore = useUiManageStore();
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content{
    margin-top: 70px;
    width: 1200px;
    min-height: 700px;
  }
}
</style>
