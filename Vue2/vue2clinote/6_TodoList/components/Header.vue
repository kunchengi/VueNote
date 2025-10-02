<template>
  <div class="todo-header">
    <!-- 添加任务输入框 -->
     <!-- 双向数据绑定，添加回车事件 -->
      <input type="text" placeholder="请输入任务名称，按回车键添加" v-model="todoName" @keyup.enter="handleAddTodo">
  </div>
</template>

<script>

export default {
    name: 'Header',
    // 接收父组件传递过来的添加任务方法
    props: {
        addTodo: Function
    },
    data() {
        return {
            todoName: ''
        }
    },
    methods: {
        // 处理添加任务事件
        handleAddTodo() {
            // 空任务，不添加
            const todoName = this.todoName.trim()
            if (!todoName) {
                return;
            }
            // 调用父组件的添加任务方法，将新任务添加到todos数组中
            this.addTodo(todoName);
            // 清空输入框
            this.todoName = ''
        }
    }
}
</script>

<style scoped>
    .todo-header input{
        width: 560px;
        height: 28px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 7px;
    }
    .todo-header input:focus{
        outline: none;
        border-color: #007bff;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 123, 255, 0.6);
    }
</style>