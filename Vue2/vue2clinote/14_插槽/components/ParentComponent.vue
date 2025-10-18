<template>
    <div>
        <!-- 使用默认内容 -->
        <h2>未传递插槽内容，使用默认内容：</h2>
        <child-component />
        <h2>传递插槽内容：</h2>
        <!-- 提供自定义内容 -->
        <child-component>
            <!-- 父组件传递了插槽内容，子组件会显示该内容 -->
            <p>默认插槽的内容：</p>
            <p>{{ userName }}，{{ age }}岁</p>
            <!-- Vue 2.6.0+ 使用 v-slot 语法 -->
            <template v-slot:car>
                <p>具名插槽car的内容：</p>
                <p>特斯拉</p>
            </template>
            <!-- 具名插槽另一种语法：使用 slot 属性 (Vue 2.6.0之前) -->
            <template slot="phone">
                <p>具名插槽phone的内容：</p>
                <p>iphone 17</p>
            </template>
            <template #son="slotProps">
                <p>具名插槽son的内容：</p>
                <p>{{ slotProps.user.name }}</p>
                <p>{{ slotProps.user.age }}</p>
            </template>
        </child-component>
    </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue'

export default {
    name: 'ParentComponent',
    components: {
        ChildComponent
    },
    data() {
        return {
            userName: '张三',
            age: 18
        }
    }
}
</script>

<style></style>
