<template>
  <div>
    <!-- 模板中直接使用name，不需要name.value -->
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <h2>车品牌：{{ car.brand }}</h2>
    <button @click="changeCarBrand">修改车品牌</button>
    <h2>车价格：{{ car.price }}</h2>
    <button @click="changeCarPriceByRef">修改车价格</button>
  </div>
</template>

<script setup lang="ts" name="Person">
// 引入ref函数，用于创建响应式数据
import { ref, toRefs, toRef } from 'vue'

const user = ref({
  name: '张三',
  age: 18,
  car: {
    brand: '奔驰',
    price: 1000000,
  }
})

// 从user.value中解构出name、age和car
// let { name, age, car } = user.value;
// 从user.value中解构出name、age和car的ref响应式数据
let { name, age, car } = toRefs(user.value);
console.log(name);// ObjectRefImpl 

function changeName() {
  // 直接修改name，页面不会自动更新，因为解构出来的基本数据类型不是响应式的
  // name = '李四';
  // 正确的修改方式是使用name.value
  name.value = '李四';
  // 修改后，user.value.name也会自动更新为李四
  console.log(user.value.name);// 李四
}
function changeAge() {
  // 直接修改age，页面不会自动更新
  // age += 1;
  // 正确的修改方式是使用toRefs将age转换为ref响应式数据，然后使用age.value修改
  age.value += 1;
}
function changeCarBrand() {
  // 直接修改car.brand，页面会自动更新，因为解构出来的引用类型是响应式的
  // car.brand = '宝马';
  // 正确的修改方式是使用toRefs将car转换为ref响应式数据，然后使用car.value.brand修改
  car.value.brand = '宝马';
}

// 从user.value.car中解构出price的ref响应式数据
let carPrice = toRef(user.value.car, 'price');
console.log(carPrice);// ObjectRefImpl
function changeCarPriceByRef() {
  carPrice.value = 2000000;
}
</script>

<style></style>
