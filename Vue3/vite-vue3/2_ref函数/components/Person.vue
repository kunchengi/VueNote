<template>
  <div>
    <!-- 模板中直接使用name，不需要name.value -->
    <h2>姓名：{{ name }}</h2>
    <button @click="changeName">修改姓名</button>
    <h2>车信息：</h2>
    <!-- 模板中直接使用car.brand -->
    <p>车品牌：{{ car.brand }}</p>
    <!-- 模板中直接使用car.price -->
    <span>车价：{{ car.price }}</span>
    <button @click="changeCarPrice">修改车价</button>
    <h2>手机信息：</h2>
    <div v-for="phone in phones" :key="phone.id">
      <span>{{ phone.brand }}：{{ phone.price }}</span>
      <button @click="deletePhone(phone.id)">删除</button>
    </div>
  </div>
</template>

<script setup lang="ts" name="Person">
// 引入ref函数，用于创建响应式数据
import { ref } from 'vue'
// 使用ref创建基本类型的响应式数据
let name = ref('张三');
function changeName() {
  // 直接修改name.value，页面会自动更新
  name.value = '李四';
}

// 使用ref创建对象类型的响应式数据
const car = ref({
  brand: '奔驰',
  price: 1000000,
})
function changeCarPrice() {
  // 直接修改car.value.price，页面会自动更新
  car.value.price = 800000;
}
console.log(car.value);// Proxy(Object)

// 使用ref创建数组类型的响应式数据
const phones = ref([
  {
    id: 1,
    brand: '小米',
    price: 3000,
  },
  {
    id: 2,
    brand: '华为',
    price: 4000,
  },
])
function deletePhone(id: number) {
  phones.value = phones.value.filter((phone) => phone.id !== id);
}
console.log(phones.value);// Proxy(Array) 
</script>

<style></style>
