<template>
  <div>
    <h2>车信息：</h2>
    <!-- 模板中直接使用user.car.brand -->
    <p>车品牌：{{ user.car.brand }}</p>
    <!-- 模板中直接使用user.car.price -->
    <span>车价：{{ user.car.price }}</span>
    <button @click="changeCarPrice">修改车价</button>
    <h2>手机信息：</h2>
    <div v-for="phone in user.phones" :key="phone.id">
      <span>{{ phone.brand }}：{{ phone.price }}</span>
      <button @click="deletePhone(phone.id)">删除</button>
    </div>
    <button @click="replaceUser">替换用户信息</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { reactive } from 'vue'

// 使用reactive创建响应式对象，该对象是深度响应式的
let user = reactive({
  name: '张三',
  age: 18,
  car: {
    brand: '奔驰',
    price: 1000000,
  },
  phones: [
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
  ]
})

function changeCarPrice() {
  // 直接修改user.car.price，页面会自动更新
  user.car.price = 800000;
}
console.log(user.car);// Proxy(Object)

function deletePhone(id: number) {
  user.phones = user.phones.filter((phone) => phone.id !== id);
}

function replaceUser() {
  const newUser = {
    name: '李四',
    age: 20,
    car: {
      brand: '宝马',
      price: 1200000,
    },
    phones: [
      {
        id: 3,
        brand: 'oppo',
        price: 3500,
      },
      {
        id: 4,
        brand: '魅族',
        price: 3200,
      },
    ]
  }
  // reactive重新分配一个新对象，会导致响应式丢失，页面不会自动更新
  // 直接将newUser赋值给user，会导致响应式丢失
  // user = newUser;
  // 即使使用reactive重新包装newUser，也会导致响应式丢失
  // user = reactive(newUser);
  // 解决方法：使用Object.assign()方法，将newUser的属性赋值给user
  Object.assign(user, newUser);
}

console.log(user.phones);// Proxy(Array) 
</script>

<style></style>
