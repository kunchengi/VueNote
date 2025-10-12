<template>
    <li>
        <label>
            <!-- 写法1，使用点击事件 -->
            <!-- <input type="checkbox" :checked="todo.done" @click="handleChange(todo.id)"> -->
            <!-- 写法2，使用change事件 -->
            <input type="checkbox" :checked="todo.done" @change="handleChange(todo.id)">
            <!-- 写法3，使用v-model指令，但不建议这么写，因为不要修改props中的数据 -->
            <!-- <input type="checkbox" v-model="todo.done"> -->
             <!-- 任务名，非编辑状态下显示 -->
            <span v-show="!isEdit">{{ todo.todoName }}</span>
             <!-- 编辑输入框，编辑状态下显示 -->
            <input ref="inputTodoName" v-show="isEdit" type="text" :value="todo.todoName" @blur="handleBlur($event)">
        </label>
        <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
         <!-- 编辑按钮，非编辑状态下显示 -->
        <button v-show="!isEdit" class="btn btn-edit" @click="handleEdit()">编辑</button>
    </li>
</template>

<script>
export default {
    name: 'Item',
    // 接收父组件传递过来的属性
    props: {
        todo: Object
    },
    data() {
        return {
            isEdit: false,
        }
    },
    methods: {
        // 处理复选框的change事件
        handleChange(id) {
            this.$bus.$emit('changeDone', id);
        },
        // 处理删除按钮的点击事件
        handleDelete(id) {
            if (confirm('确定删除吗？')) {
                this.$bus.$emit('deleteTodo', id);
            }
        },
        // 处理编辑按钮的点击事件
        handleEdit() {
            this.isEdit = true;
            // 此时input框还未显示，下行代码无效
            // this.$refs.inputTodoName.focus();
            // 解决方法：使用nextTick()方法，等DOM更新完成后再调用focus()方法
            this.$nextTick(() => {
                this.$refs.inputTodoName.focus();
            })
        },
        // 处理编辑输入框的blur事件
        handleBlur(e) {
            this.isEdit = false;
            const newName = e.target.value.trim();
            if(!newName) {
                alert('输入不能为空');
                return;
            }
            // 触发父组件的updateTodo事件，更新任务名
            this.$bus.$emit('updateTodo', this.todo.id, newName);
        }
    }
}
</script>

<style scoped>
li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
}

li label {
    float: left;
    cursor: pointer;
}

li label input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
}

li .btn {
    float: right;
    display: none;
    margin-top: 3px;
}

li:before {
    contain: initial;
}

li:last-child {
    border-bottom: none;
}

li:hover {
    background-color: #e9e9e9;
}

li:hover .btn {
    display: block;
}
</style>