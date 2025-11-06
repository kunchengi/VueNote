<template>
  <div>
    <h2>监视ref的对象类型数据</h2>
    <div>name：{{ user.name }}</div>
    <div>age：{{ user.age }}</div>
    <button @click="changeName">改名</button>
    <button @click="addAge">+1岁</button>
    <button @click="replaceUser">换人</button>
  </div>
</template>

<script setup lang="ts" name="WatchRefObject">
// 引入ref函数
import { ref, watch } from 'vue'
const user = ref({
  name: '张三',
  age: 18
})
// 定义一个函数changeName，用于改变user的name
function changeName() {
  console.log('改名');
  user.value.name = '李四'
}
// 定义一个函数addAge，用于增加user的age
function addAge() {
  console.log('+1岁');
  user.value.age++
}
// 定义一个函数replaceUser，用于替换user
function replaceUser() {
  console.log('换人');
  user.value = {
    name: '王五',
    age: 20
  }
}

// 浅监视，当修改user.value时才会触发回调函数，修改user的name或age时都不会触发回调函数
watch(user, (newValue, oldValue) => {
  console.log('浅监视，user变化了', newValue, oldValue)
})
// 深监视，当修改user.value时也会触发回调函数，修改user的name或age时也会触发回调函数
// 当修改的值是对象内的属性时，newValue和oldValue相同，且都是最新的对象
watch(user, (newValue, oldValue) => {
  console.log('深监视，user变化了', newValue, oldValue)
}, {
  deep: true,
  // 初始化时是否触发回调函数，默认false
  immediate: true
})
</script>

<style></style>
