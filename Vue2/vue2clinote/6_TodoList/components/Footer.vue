<!-- 底部组件 -->
<template>
    <!-- 总数大于0才显示 -->
    <div class="todo-footer" v-show="total">
        <label>
            <!-- 写法1，通过change事件改变isAll的值 -->
            <!-- <input type="checkbox" :checked="isAll" @change="changeIsAll"> -->
            <!-- 写法2，通过v-model绑定isAll的值，isAll计算属性需要设置setter方法 -->
            <input type="checkbox" v-model="isAll">
        </label>
        <span>
            <span>已完成{{ doneTotal }}</span>/<span>全部{{ total }}</span>
        </span>
        <button class="btn btn-danger" @click="clearAll">清除已完成</button>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    // 接收父组件传递过来的属性
    props: {
        todos: Array,
        changeAllTodo: Function,
        clearAllTodo: Function
    },
    computed: {
        // 总数
        total() {
            return this.todos.length;
        },
        // 已完成数
        doneTotal() {
            return this.todos.reduce((pre, cur) => {
                return pre + (cur.done ? 1 : 0)
            }, 0)
        },
        // 是否全选写法1
        // isAll() {
        //     return this.doneTotal === this.total && this.total > 0;
        // }
        // 是否全选写法2
        isAll: {
            get() {
                return this.doneTotal === this.total && this.total > 0;
            },
            // 当全选复选框改变时，调用changeAllTodo方法，修改所有任务的done属性
            set(val) {
                this.changeAllTodo(val);
            }
        }
    },
    methods: {
        // isAll写法1，实现全选功能
        // changeIsAll(e) {
        //     const isAll = e.target.checked;
        //     this.changeAllTodo(isAll);
        // },
        // 清除已完成任务
        clearAll() {
            if (confirm('确定清除已完成任务吗？')) {
                this.clearAllTodo();
            }
        }
    }
}
</script>

<style scoped>
.todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
}

.todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
}

.todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
}

.todo-footer button {
    float: right;
    margin-top: 5px;
}
</style>