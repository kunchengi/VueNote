<template>
  <div>
    <!-- 直接在父组件标签中传递参数值 -->
    <Title title="用户信息" remark="备注" />
    <!-- 使用 v-bind 或 : 语法传递参数值 -->
    <!-- 可以使用 v-bind 或 : 语法动态绑定 Prop 名 -->
    <!-- 当一个 props 包含该属性，直接传该属性不赋值时，传递的值为true -->
    <BaseInfo :name="username" v-bind:age="age" :email="email" :[key]="id" isVip />
    <!-- 由于 HTML 是不区分大小写的，所以在 HTML 中传递参数时，建议使用短横线分隔命名法（kebab-case） -->
    <CarInfo :car-info="car" remark="备注" />
    <PhoneInfo v-bind:phones="phones" />
  </div>
</template>

<script>
import Title from './Title.vue'
import BaseInfo from './BaseInfo.vue'
import CarInfo from './CarInfo.vue'
import PhoneInfo from './PhoneInfo.vue'

export default {
    data() {
        return {
            username: "Kensen",
            age: 20,
            email: "123@qq.com",
            key: "id",
            id: "001",
            car: {
                brand: '奔驰',
                color: '红色',
            },
            phones: [
                {
                    name: 'iPhone 17 pro max',
                    color: '白色',
                },
                {
                    name: '小米 17 pro max',
                    color: '黑色',
                }
            ]
        }
    },
    components: {
        BaseInfo: BaseInfo,
        Title: Title,
        CarInfo: CarInfo,
        PhoneInfo: PhoneInfo,
    }
}
</script>

<style>

</style>