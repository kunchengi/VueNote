<template>
  <div id="app">
    <button @click="getStudents">获取学生信息</button>
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  methods: {
    getStudents() {
      // 由于请求的是api1前缀的资源，所以会被代理到http://localhost:5000/students
      axios.get('/api1/students').then(res => {
        console.log('请求成功');
        console.log(res.data)
      }).catch(err => {
        console.log('请求失败');
        console.log(err)
      })
    },
    getCars() {
      // 由于请求的是api2前缀的资源，所以会被代理到http://localhost:5001/cars
      axios.get('/api2/cars').then(res => {
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
