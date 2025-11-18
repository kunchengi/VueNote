<template>
  <div>
    <!-- 在父组件模板中监听notify事件 -->
    <Hello @notify="handleNotify"/>
    <hr>
    <h1>用户邮箱：{{ userEmail }}</h1>
    <!-- 输入框中v-model的本质就是v-bind:value和@input的组合 -->
    <input type="text" v-model="userEmail">
    <div>
      <span>父组件输入邮箱：</span>
      <input type="text" v-model="userEmail">
    </div>
    <!-- 父子组件双向通信：监听input-change事件，当子组件输入框的值发生改变时，更新父组件的userEmail -->
    <InputCom :email="userEmail" @input-change="changeEmail" :isVModel="false" />
    <!-- 使用 v-model，本质就是传递了modelValue属性和update:modelValue事件 -->
    <InputCom v-model="userEmail" :isVModel="true" />
    <!-- 可以自定义v-model名称，子组件需要接收email属性，监听update:email事件，其实就是把modelValue换成了email -->
    <!-- <InputCom v-model:email="userEmail" :isVModel="true" /> -->
  </div>
</template>

<script lang="ts" setup name="App">
import Hello from '@/components/Hello.vue'
import InputCom from '@/components/InputCom.vue'
import { ref } from 'vue'

const userEmail = ref('')

// 定义一个函数，用于处理子组件触发的notify事件，user为子组件传递过来的数据
function handleNotify(user: { id: number, name: string }) {
    console.log(`子组件触发notify事件，传递过来的数据是：${user.id} ${user.name}`);
}

// 定义一个函数，用于处理子组件触发的input-change事件，newEmail为子组件传递过来的新邮箱值
function changeEmail(newEmail: string) {
  userEmail.value = newEmail;
}
</script>

<style scoped>
</style>
