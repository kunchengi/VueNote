<template>
    <ul class="todo-list">
        <!--给每一个item组件加上动画效果，初次渲染时也会有动画效果 -->
        <transition-group name="todo" appear>
            <Item v-for="todo in todos" :key="todo.id" :todo="todo" />
        </transition-group>
    </ul>
</template>

<script>
import Item from './Item.vue'
export default {
    name: 'List',
    components: {
        Item
    },
    props: {
        todos: Array
    }
}
</script>

<style scoped>
.todo-list {
    margin: 0;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0;
}

/* 进入过程的动画 */
.todo-enter-active {
    animation: todo-animate 0.5s linear;
}

/* 离开过程的动画 */
.todo-leave-active {
    animation: todo-animate 0.5s linear reverse;
}

/* 动画效果 */
@keyframes todo-animate {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}
</style>