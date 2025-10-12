<template>
    <ul class="todo-list">
        <Item v-for="todo in todos" :key="todo.id" :todo="todo" />
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
</style>