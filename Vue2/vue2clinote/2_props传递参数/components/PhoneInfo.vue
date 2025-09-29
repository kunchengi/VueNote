<template>
  <div>
    <h2>手机列表</h2>
    <div v-for="phone in phones" :key="phone.name">
        <p>名称：{{ phone.name }}</p>
        <p>颜色：{{ phone.color }}</p>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        phones: {
            type: Array,
            default: () => [],// 对象/数组默认值必须从工厂函数返回
        }
    },
}
</script>

<style>

</style>