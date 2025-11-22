<template>
  <div>
    <h2>用户信息：</h2>
    <div>
      <span>用户名：{{ user.name }}</span>
    </div>
    <div>
      <span>车品牌：{{ user.car.brand }}</span>
    </div>
  </div>
</template>

<script setup lang="ts" name="User">
// 模拟异步请求用户信息
const requestUser = (): Promise<any> =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                name: '张三',
                car: {
                    brand: '奔驰',
                }
            })
        }, 3000)
    })
}

// 异步获取用户信息，setup里可以直接使用await，此时该组件为异步组件
const user = await requestUser();
</script>

<style></style>
