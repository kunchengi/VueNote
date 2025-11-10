<template>
  <div>
    <div>
      <h2>学生列表</h2>
      <div v-for="student in state.students" :key="student.id">{{ `姓名：${student.name}，年龄：${student.age}` }}</div>
    </div>
    <div>
      <h2>车列表</h2>
      <div v-for="car in state.cars" :key="car.id">{{ `车名：${car.name}，价格：${car.price}` }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup name="App">
import axios from 'axios'
import { reactive, onMounted } from 'vue'
// 定义学生和车的类型
type Student = {
  id: number,
  name: string,
  age: number
}
type Car = {
  id: number,
  name: string,
  price: number
}

// 定义状态对象，包含学生列表和车列表
const state = reactive<{
  students: Student[],
  cars: Car[]
}>({
  students: [],
  cars: []
})

// 组件挂载时初始化数据
onMounted(() => {
  async function init(): Promise<void> {
    const students = await getStudents();
    const cars = await getCars();
    state.students = students;
    state.cars = cars;
  }
  init()
})
// 获取学生列表
async function getStudents(): Promise<Student[]> {
  const res = await axios.get('/api1/students')
  return res.data;
}

// 获取车列表
async function getCars(): Promise<Car[]> {
  const res = await axios.get('/api2/cars')
  return res.data;
}
</script>

<style scoped></style>
