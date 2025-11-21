<template>
  <div>
    <h2>shallowReactive：</h2>
    <div>
      <span>用户名：{{ user.name }}</span>
      <button @click="changeUserName">修改用户名(第一层属性，会更新UI)</button>
    </div>
    <div>
      <span>车品牌：{{ user.car.brand }}</span>
      <button @click="changeCarBrand">修改车品牌（第二层属性，不会更新UI）</button>
    </div>
    <button @click="replaceUser">替换用户信息，会更新UI</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { shallowReactive } from 'vue'

// shallowReactive 会使对象的第一层属性成为响应式，但是第二层属性不会成为响应式
let user = shallowReactive({
  name: '张三',
  car: {
    brand: '奔驰',
  }
})

function changeUserName() {
  user.name = '李四';
}

function changeCarBrand() {
  user.car.brand = '宝马';
}

function replaceUser() {
  const newUser = {
    name: '王五',
    car: {
      brand: '保时捷',
    }
  }
  Object.assign(user, newUser);
}

</script>

<style></style>
