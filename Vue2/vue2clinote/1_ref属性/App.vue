<template>
  <div id="app">
    <School ref="schoolCom"></School>
    <button @click="changeSchoolName">修改学校名称</button>
    <button @click="changeSchoolAddress">修改学校地址</button>
  </div>
</template>

<script>
// 引入School组件
import School from './components/School.vue'
export default {
  name: 'App',
  components: {
    School
  },
  methods: {
    changeSchoolName() {
      console.log(this.$refs.schoolCom);// VueComponent {_uid: 2, _isVue: true, __v_skip: true, _scope: EffectScope, $options: {…}, …}
      // 修改子组件的name属性
      this.$refs.schoolCom.name = '复旦大学';
    },
    changeSchoolAddress() {
      // 调用子组件的changeSchoolAddress方法
      this.$refs.schoolCom.changeSchoolAddress();
    }
  }
}
</script>

<style></style>
