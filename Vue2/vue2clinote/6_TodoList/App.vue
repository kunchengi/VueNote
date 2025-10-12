<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- 给MyHeader绑定addTodo自定义事件 -->
        <Header @addTodo="addTodo" />
        <!-- 列表 -->
        <List :todos="todos" :changeDone="changeDone" :deleteTodo="deleteTodo" />
        <!-- 底部 -->
        <Footer :todos="todos" @changeAllTodo="changeAllTodo" @clearAllTodo="clearAllTodo" />
      </div>
    </div>
  </div>
</template>

<script>
// 引入nanoid库，用于生成唯一id
import { nanoid } from 'nanoid'
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    List,
    Footer,
  },
  data() {
    return {
      // 读取localStorage中的todos数据
      todos: JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  methods: {
    // 添加任务
    addTodo(todoName) {
      const newTodo = {
        id: nanoid(),
        todoName,
        done: false
      }
      this.todos.unshift(newTodo)
    },
    // 修改任务状态
    changeDone(id) {
      const todo = this.todos.find(item => item.id === id)
      todo.done = !todo.done
    },
    // 删除任务
    deleteTodo(id) {
      this.todos = this.todos.filter(item => item.id !== id)
    },
    // 全选/取消全选
    changeAllTodo(done) {
      this.todos.forEach(item => {
        item.done = done;
      })
    },
    // 清除已完成任务
    clearAllTodo() {
      this.todos = this.todos.filter(item => !item.done)
    },
  },
  // 监听todos变化，同步更新localStorage
  watch: {
    todos: {
      deep: true,// 深度监听，当todos数组中的元素发生变化时也会触发监听
      handler(newVal) {
        localStorage.setItem('todos', JSON.stringify(newVal))
      },
      deep: true
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
