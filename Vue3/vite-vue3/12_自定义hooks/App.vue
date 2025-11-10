<template>
  <div>
    <div>
      <h2>学生列表</h2>
      <div v-for="student in students" :key="student.id">{{ `姓名：${student.name}，年龄：${student.age}` }}</div>
      <button @click="addStudent">添加一个学生</button>
      <button @click="saveStudents">保存学生列表</button>
    </div>
  </div>
</template>

<script lang="ts" setup name="App">
  import useStudents from './hooks/useStudents'
  // 调用自定义hooks获取学生列表、添加学生方法、保存学生列表方法
  const { students, addStudent, saveStudents } = useStudents();
</script>

<style scoped>
</style>
