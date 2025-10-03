<template>
  <div id="app">
    <!-- 在父组件模板中监听notify事件，.native 监听子组件根元素的原生事件 -->
    <Hello @notify="handleNotify" @click.native="handleComponentClick" />
    <hr>
    <h1>用户邮箱：{{ userEmail }}</h1>
    <div>
      <span>父组件输入邮箱：</span>
      <input type="text" v-model="userEmail">
    </div>
    <!-- 父子组件双向通信：监听input-change事件，当子组件输入框的值发生改变时，更新父组件的userEmail -->
    <InputCom :email="userEmail" @input-change="userEmail = $event" :isSync="false" />
    <!-- 使用 .sync -->
    <InputCom :email.sync="userEmail" :isSync="true" />
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import InputCom from './components/InputCom.vue'

export default {
  name: 'App',
  components: {
    Hello,
    InputCom
  },
  data() {
    return {
      userEmail: ''
    }
  },
  methods: {
    // msg为子组件传递过来的数据
    handleNotify(user) {
      console.log(user);
    },
    // 监听子组件根元素原生的click事件
    handleComponentClick(e) {
      console.log(e.target);
    }
  }
}
</script>

<style></style>
