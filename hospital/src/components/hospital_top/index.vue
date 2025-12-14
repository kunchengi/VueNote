<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="handleClick">
        <img src="@/assets/images/logo.png" alt="中山三院logo">
        <p>京医通预约挂号统一平台</p>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login" @click="handleLoginClick">登录/注册</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import useUiManageStore from '@/store/modules/uiManage'

// 初始化 Vue Router 实例
const router = useRouter()
const uiManageStore = useUiManageStore()

// 处理点击事件，跳转首页
const handleClick = () => {
    // 使用 Vue Router 跳转首页
    router.push({
      path: '/home'
    })
}

// 处理登录点击事件，打开登录弹窗
const handleLoginClick = () => {
    uiManageStore.showLogin = true;
}
</script>

<style lang="scss" scoped>
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;

  .content {
    width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .left {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      p {
        font-size: 20px;
        color: #55a6fe;
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #bbb;

      .help {
        cursor: pointer;
        margin-right: 10px;
        &:hover {
          color: #55a6fe;
        }
      }

      .login {
        cursor: pointer;
        &:hover {
          color: #55a6fe;
        }
      }
    }
  }
}
</style>