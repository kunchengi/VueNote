<template>
  <div>
    <h2>readOnly：</h2>
    <div>
      <span>只读数据的用户名：{{ readonlyUser.name }}</span>
      <button @click="changeUserName">修改原数据用户名，会更新UI</button>
    </div>
    <div>
      <span>车品牌：{{ readonlyUser.car.brand }}</span>
      <button @click="changeCarBrand">修改原数据车品牌，会更新UI</button>
    </div>
    <button @click="replaceUser">替换只读数据用户信息，不会更新UI</button>
  </div>
</template>

<script setup lang="ts" name="ReadOnlyCom">
import { reactive, readonly } from 'vue'

let user = reactive({
  name: '张三',
  car: {
    brand: '奔驰',
  }
})

// 创建深只读响应式副本
let readonlyUser = readonly(user);

function changeUserName() {
  user.name = '李四';
  // readonlyUser.name = '张三';// 修改只读数据，会报错
}

function changeCarBrand() {
  user.car.brand = '宝马';
  // readonlyUser.car.brand = '宝马';// 修改只读数据，会报错
}

function replaceUser() {
  const newUser = {
    name: '王五',
    car: {
      brand: '保时捷',
    }
  }
  Object.assign(readonlyUser, newUser);// 不会报错，但会弹出警告，且不会更新数据
}

</script>

<style></style>
