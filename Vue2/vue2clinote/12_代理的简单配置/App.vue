<template>
  <div id="app">
    <button @click="getStudents">获取学生信息</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  methods: {
    getStudents() {
      // 发送GET请求当前页面端口的/students资源，如果前端不存在/students资源时，该请求会转发给代理服务（http://localhost:5000）
      // 8080为当前页面的端口
      // axios.get('http://localhost:8080/students').then(res => {
      //   console.log('请求成功');
      //   console.log(res.data)
      // }).catch(err => {
      //   console.log('请求失败');
      //   console.log(err)
      // })
      // 由于默认情况下，axios会将请求发送到与当前页面相同的域名下，
      // 所以这里可以直接发送GET请求/students资源，
      axios.get('/students').then(res => {
        console.log('请求成功');
        console.log(res.data)
      }).catch(err => {
        console.log('请求失败');
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
