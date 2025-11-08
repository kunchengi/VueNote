<template>
  <div>
    <!-- 显示人员的姓名和年龄 -->
    <span> 来源：{{ props.sourceName }}，姓名：{{ props.person.name }}，年龄：{{ props.person.age }}</span>
  </div>
</template>

<script lang="ts" setup name="Person">
// defineProps、withDefaults、defineExpose属于宏函数,不需要导出也可以在<script setup>中直接使用
// import { defineProps, withDefaults } from 'vue'
import { type IPerson } from '../types/index'

// 定义一个props，用于接收父组件传递过来的数据
// defineProps传递的配置与vue2的props配置相似
// props为响应式对象，当父组件传递的数据发生变化时，props也会同步更新

// 可以用数组接收
// const props = defineProps(['person', 'sourceName']);
// 也可以用配置项接收
// const props = defineProps({
//   person: {
//     type: Object as () => IPerson,// 类型限制
//     required: true,// 是否必填
//     default: () => ({ id: '', name: '', age: 0 }),// 默认值
//   },
//   sourceName: {
//     type: String as () => string,// 类型限制
//     required: false,// 是否必填
//     default: () => '默认来源',// 默认值
//   },
// })

// 也可以使用vue3的语法
// 1. 定义props类型
// 在defineProps中定义props类型时，需要使用泛型
// type Props = {
//   person: IPerson;
//   sourceName: string;
// }
// const props = defineProps<Props>();


// 2. 设置是否必填
// 可以在定义props类型时，直接设置是否必填
// type Props = {
//   person: IPerson;
//   sourceName?: string;// 可选值
// }
// const props = defineProps<Props>();

// 3. 设置默认值
// 可以在定义props类型时，使用withDefaults包裹defineProps，设置默认值
type Props = {
  person: IPerson;
  sourceName?: string;// 可选值
}
const props = withDefaults(defineProps<Props>(), {
  // 对象必须写成函数的形式，否则会报错
  person: () => ({ id: '', name: '', age: 0 }),
  // 基本数据类型可以直接赋值,也可以写成函数的形式
  // sourceName: '默认来源',
  sourceName: () => '默认来源',
})

console.log('props', props);
console.log('props.person', props.person);

</script>

<style scoped></style>
