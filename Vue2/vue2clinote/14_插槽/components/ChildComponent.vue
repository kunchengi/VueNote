<template>
    <div>
        <!-- 子组件定义了一个插槽，用于接收父组件传递的自定义内容。 -->
        <slot>
            <p>默认插槽的默认内容</p>
        </slot>
        <slot name="car">
            <p>具名插槽car的默认内容</p>
        </slot>
        <slot name="phone">
            <p>具名插槽phone的默认内容</p>
        </slot>
        <!-- 将user传递给插槽 -->
        <slot name="son" :user="user">
            <p>{{ user.name }}-{{ user.age }}</p>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'ChildComponent',
    data() {
        return {
            user: {
                name: '李四',
                age: 1
            }
        }
    },
    mounted() {
        if (this.$slots.default) {
            console.log('非作用域插槽的内容：');
            console.log(this.$slots.default)
            console.log(this.$slots.car)
            console.log(this.$slots.phone)
        }
        if (this.$scopedSlots.son) {
            console.log('作用域插槽的内容：');
            console.log(this.$scopedSlots.son({ user: this.user }))
        }
    }
}
</script>

<style></style>