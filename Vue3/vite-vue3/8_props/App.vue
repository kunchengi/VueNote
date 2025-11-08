<template>
  <div>
    <!-- 传递person和sourceName给子组件 -->
    <Person v-for="person in personList" :key="person.id" :person="person" :sourceName="name" />
    <button @click="addPerson">加个人</button>
  </div>
</template>

<script lang="ts" setup name="App">
import Person from './components/Person.vue'
import { type IPerson } from './types/index'
import { reactive } from 'vue'
const name = 'App'
// 定义一个响应式的数组，用于存储人员列表
const personList: IPerson[] = reactive([
  { id: '1', name: '张三', age: 18 },
  { id: '2', name: '李四', age: 20 },
  { id: '3', name: '王五', age: 22 },
])

// 定义一个方法，用于添加一个新的人员
const addPerson = () => {
  const newId = (personList.length + 1).toString()
  // 当修改personList时,Person组件的props也会自动更新
  personList.push({ id: newId, name: '工号' + newId, age: 25 })
}
</script>

<style scoped></style>
