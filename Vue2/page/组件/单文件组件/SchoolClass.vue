<template>
    <div>
        <h1>班级名称：{{ name }}</h1>
        <button @click="addStudent">添加学生</button>
        <div v-for="item in students" :key="item.name">
            <h1>{{ item.name }} {{ item.age }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SchoolClass',
    data() {
        return {
            name: '终极一班',
            students: [
                { name: '张三', age: 18 },
                { name: '李四', age: 19 },
                { name: '王五', age: 20 }
            ]
        }
    },
    methods: {
        addStudent() {
            this.students.push({ name: '赵六', age: 21 })
        }
    }
}
</script>

<style></style>