<template>
  <div>
    <h2>用户信息</h2>
    <p>当前用户姓名：{{ fullName }}</p>
    <input v-model="localData.firstname" placeholder="请输入姓">
    <input v-model="localData.lastname" placeholder="请输入名">
    <button @click="userStore.setName({ firstName: localData.firstname, lastName: localData.lastname })">提交</button>
  </div>
</template>
<script lang="ts" setup name="User">
import { reactive } from 'vue'
// 获取用户模块的store
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
const userStore = useUserStore();
const { firstname, lastname, fullName } = storeToRefs(userStore);

const localData = reactive({
    firstname: firstname.value,
    lastname: lastname.value
})
</script>

<style>

</style>