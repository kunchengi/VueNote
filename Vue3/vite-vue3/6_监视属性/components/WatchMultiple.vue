<template>
  <div>
    <h2>监视多个属性</h2>
    <div>name：{{ user.name }}</div>
    <div>car brand：{{ user.car.brand }}</div>
    <div>car price：{{ user.car.price }}</div>
    <button @click="changeName">改名</button>
    <button @click="changeCarBrand">换车品牌</button>
    <button @click="changeCarPrice">换车价格</button>
    <button @click="changeCar">换车</button>
  </div>
</template>

<script setup lang="ts" name="WatchMultiple">
import { reactive, watch } from 'vue'
const user = reactive({
  name: '张三',
  car: {
    brand: '奔驰',
    price: 1000000
  }
})
// 定义一个函数changeName，用于改变user的name
function changeName() {
  user.name = '李四'
}
// 定义一个函数changeCarBrand，用于改变user.car的brand
function changeCarBrand() {
  user.car.brand = '宝马'
}
// 定义一个函数changeCarPrice，用于改变user.car的price
function changeCarPrice() {
  user.car.price = 800000
}
// 定义一个函数changeCar，用于改变user.car
function changeCar() {
  user.car = {
    brand: '奥迪',
    price: 900000
  }
}

// 监视多个属性，第一个参数为数组，数组元素为需要监视的数据，按需写数据或者getter函数返回属性值
// newValue为新数组，oldValue为旧数组，数组元素为对应属性的新值或旧值
watch([() => user.name,() => user.car], (newValue, oldValue) => {
  console.log('name或car变化了', newValue, oldValue)
}, {
  deep: true
})

</script>

<style></style>
