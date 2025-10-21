<template>
  <div>
    <h2>用户信息</h2>
    <p>当前用户姓名：{{ $store.getters['user/fullName'] }}</p>
    <input v-model="firstname" placeholder="请输入姓">
    <input v-model="lastname" placeholder="请输入名">
    <button @click="submitUserName">提交</button>
  </div>
</template>
<script>
// 引入常量模块
import * as constant from '@/store/constant'

export default {
    name: 'User',
    data() {
        return {
            firstname: this.$store.state.user.firstname,
            lastname: this.$store.state.user.lastname
        }
    },
    methods: {
        // 提交用户姓名
        submitUserName() {
            this.$store.dispatch(`${constant.USER}/${constant.SET_NAME}`, {
                firstname: this.firstname,
                lastname: this.lastname
            })
        }
    }
}
</script>

<style>

</style>