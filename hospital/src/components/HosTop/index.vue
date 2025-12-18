<template>
  <div class="hos-top">
    <div class="hos-top__content">
      <!-- 左侧 -->
      <div class="hos-top__logo" @click="handleClick">
        <img src="@/assets/images/logo.png" alt="中山三院logo">
        <p>京医通预约挂号统一平台</p>
      </div>
      <!-- 右侧 -->
      <div class="hos-top__opt">
        <p class="hos-top__help">帮助中心</p>
        <p class="hos-top__login" @click="handleLoginClick" v-if="!userDataStore.userInfo">登录/注册</p>
        <!-- 如果用户已登录，显示用户信息和下拉菜单 -->
        <user-dropdown v-else :user-name="userDataStore.userInfo.name" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="HosTop">
import { useRouter } from 'vue-router'
import useUiManageStore from '@/store/modules/uiManage'
import useUserDataStore from '@/store/modules/userData'
import UserDropdown from '@/components/UserDropdown/index.vue'


// 初始化 Vue Router 实例
const router = useRouter()
const uiManageStore = useUiManageStore()
const userDataStore = useUserDataStore()

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
.hos-top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;

  .hos-top__content {
    width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .hos-top__logo {
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

    .hos-top__opt {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #bbb;

      .hos-top__help {
        cursor: pointer;
        margin-right: 10px;

        &:hover {
          color: #55a6fe;
        }
      }

      .hos-top__login {
        cursor: pointer;

        &:hover {
          color: #55a6fe;
        }
      }
    }
  }
}
</style>