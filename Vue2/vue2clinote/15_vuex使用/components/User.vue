<template>
  <div>
    <h2>用户信息</h2>
    <!-- 映射后可以直接读取模块中的getters -->
    <p>当前用户姓名：{{ fullName }}</p>
    <input v-model="localFirstname" placeholder="请输入姓">
    <input v-model="localLastname" placeholder="请输入名">
    <button @click="setName({ firstname: localFirstname, lastname: localLastname })">提交</button>
  </div>
</template>
<script>
// 引入常量模块
import { USER, SET_NAME } from '@/store/constant'
// 引入map辅助函数
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'User',
    data() {
        return {
            // 本地数据，用于双向绑定
            localFirstname: this.$store.state.user.firstname,
            localLastname: this.$store.state.user.lastname
        }
    },
    computed: {
        // 映射 user 模块的 state
        ...mapState(USER, ["firstname", "lastname"]),
        // 映射 user 模块的 getters
        ...mapGetters(USER, ["fullName"]),
    },
    methods: {
        // 映射 user 模块的 actions
        ...mapActions(USER, [SET_NAME]),
    }
}
</script>

<style>

</style>