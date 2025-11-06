<template>
  <div>
    <h2>watchEffect自动监视函数中依赖的响应式数据</h2>
    <div>name：{{ user.name }}</div>
    <div>car brand：{{ user.car.brand }}</div>
    <div>car price：{{ user.car.price }}</div>
    <div>age：{{ user.age }}</div>
    <button @click="addAge">年龄+1</button>
    <button @click="changeCarBrand">换车品牌</button>
  </div>
</template>

<script setup lang="ts" name="WatchEffect">
import { reactive, watchEffect } from 'vue'
const user = reactive({
  name: '张三',
  age: 18,
  car: {
    brand: '奔驰',
    price: 1000000
  }
})

function addAge() {
  console.log('年龄+1');
  user.age++;
}
// 定义一个函数changeCarBrand，用于改变user.car的brand
function changeCarBrand() {
  console.log('换车品牌');
  user.car.brand = user.car.brand == '奔驰' ? '宝马' : '奔驰'
}

// 由于函数内依赖了user.age和user.car.brand，所以当这两个数据变化时，会自动执行函数
// 这里有个坑，由于if语句用的是||，所以当user.age >= 21为true时，不会再判断user.car.brand == '奥迪'。
// 这时候该函数就不会依赖user.car.brand，当user.car.brand变化时，也不会执行函数。
watchEffect(() => {
  console.log('user.name或user.car.brand变化了');
  if(user.age >= 21 || user.car.brand == '奥迪') {
    console.log('让李四或者开奥迪的人去买烟')
  }
})

</script>

<style></style>
