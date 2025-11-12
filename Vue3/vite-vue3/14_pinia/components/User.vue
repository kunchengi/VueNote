<template>
  <div>
    <h2>用户信息</h2>
    <p>当前用户姓名：{{ fullName }}</p>
    <input v-model="localData.firstname" placeholder="请输入姓">
    <input v-model="localData.lastname" placeholder="请输入名">
    <button @click="setName({ firstname: localData.firstname, lastname: localData.lastname })">提交</button>
  </div>
</template>
<script lang="ts" setup name="User">
import { reactive, computed } from 'vue'
const localData = reactive({
    firstname: '',
    lastname: ''
})
const fullName = computed(() => localData.firstname + localData.lastname);
// 提交
function setName({ firstname, lastname }: { firstname: string; lastname: string }) {
    console.log('提交用户信息', firstname, lastname);
}
</script>

<style>

</style>