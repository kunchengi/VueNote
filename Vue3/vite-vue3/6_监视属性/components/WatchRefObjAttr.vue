<template>
  <div>
    <h2>监视ref的对象的属性</h2>
    <div>name：{{ user.name }}</div>
    <div>car brand：{{ user.car.brand }}</div>
    <div>car price：{{ user.car.price }}</div>
    <button @click="changeName">改名</button>
    <button @click="changeCarBrand">换车品牌</button>
    <button @click="changeCarPrice">换车价格</button>
    <button @click="changeCar">换车</button>
  </div>
</template>

<script setup lang="ts" name="WatchRefObjAttr">
// 引入ref函数
import { ref, watch } from 'vue'
const user = ref({
  name: '张三',
  car: {
    brand: '奔驰',
    price: 1000000
  }
})
// 定义一个函数changeName，用于改变user的name
function changeName() {
  user.value.name = '李四'
}
// 定义一个函数changeCarBrand，用于改变user.car的brand
function changeCarBrand() {
  user.value.car.brand = '宝马'
}
// 定义一个函数changeCarPrice，用于改变user.car的price
function changeCarPrice() {
  user.value.car.price = 800000
}
// 定义一个函数changeCar，用于改变user.car
function changeCar() {
  user.value.car = {
    brand: '奥迪',
    price: 900000
  }
}

// 如果需要监听ref的对象的基本数据类型属性，需要使用getter函数返回属性值
// getter函数即是一个返回属性值的函数
watch(() => user.value.name, (newValue, oldValue) => {
  console.log('name变化了', newValue, oldValue)
})

// 如果需要监听ref的对象的对象类型属性，需要使用getter函数返回属性值
// 强制深度监视，且不能关闭深度监视
// 只能深度监视该对象内的属性变化，不能监视对象自身
// 当直接修改user.value.car时，不会触发回调函数，且会丢失监视car的属性变化
// 不建议使用该方式，建议使用getter函数返回需要监视的对象
watch(user.value.car, (newValue, oldValue) => {
  console.log('非getter方式，car的属性变化了', newValue, oldValue)
})

// 如果想监视属性自身的变化，需要使用getter函数返回需要监视的对象
// 开启深度监视后可以监视对象的属性变化
watch(() => user.value.car, (newValue, oldValue) => {
  console.log('getter方式，car变化了', newValue, oldValue)
}, {
  deep: true
})

</script>

<style></style>
