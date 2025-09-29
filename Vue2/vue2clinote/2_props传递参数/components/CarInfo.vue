<template>
  <div>
    <h2>汽车信息</h2>
    <p>品牌：{{ carInfo.brand }}</p>
    <p >颜色：{{ carInfo.color }}</p>
    <p>非props属性：{{ $attrs }}</p>
  </div>
</template>

<script>

export default {
    props: {
        // 在组件中定义 props 时，建议使用驼峰命名法（camelCase）
        carInfo: {
            type: Object,
            default: () => ({})// 对象/数组默认值必须从工厂函数返回
        }
    },
    created() {
        // 通过this.$props访问所有传递的props
        console.log(this.$props);
        // props是只读的，不能直接修改props中的值，会报错
        // this.carInfo = {
        //     brand: "宝马",
        //     color: "白色",
        // }
        // 可以修改对象的属性，但不建议这么做，因为会改变父组件中的数据
        this.carInfo.brand = "宝马";
        console.log('非props属性：', this.$attrs);// 非props属性： {remark: '备注'}
    }
}
</script>

<style>

</style>