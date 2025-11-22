<template>
  <div>
  </div>
</template>

<script lang="ts" setup name="App">
import { reactive, toRaw, markRaw } from 'vue'

const user = {
  name: '张三',
  age: 18,
}

const userProxy = reactive(user)
// 响应式对象为Proxy对象
console.log('userProxy', userProxy);// Proxy(Object) {name: '张三', age: 18}
// toRaw方法将响应式对象转换为普通对象
const userProxyRaw = toRaw(userProxy)
console.log(userProxyRaw)// {name: '张三', age: 18}

// markRaw方法标记一个普通对象，使其永远不能成为响应式对象
const car = markRaw({
  name: '奔驰',
  price: 1000000,
})
// 即时使用了reactive方法，返回值也还是普通对象，但是会添加一个__v_skip属性，代表这个对象是一个普通对象，不会被代理
const carProxy = reactive(car)
console.log('carProxy', carProxy);// {name: '奔驰', price: 1000000, __v_skip: true}


</script>

<style scoped>
</style>
