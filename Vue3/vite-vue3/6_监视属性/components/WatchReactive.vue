<template>
    <div>
        <h2>监视reactive的数据</h2>
        <div>name：{{ user.name }}</div>
        <div>age：{{ user.age }}</div>
        <button @click="changeName">改名</button>
        <button @click="addAge">+1岁</button>
        <button @click="replaceUser">换人</button>
    </div>
</template>

<script setup lang="ts" name="WatchReactive">
// 引入reactive函数
import { reactive, watch } from 'vue'
const user = reactive({
    name: '张三',
    age: 18
})
// 定义一个函数changeName，用于改变user的name
function changeName() {
    console.log('改名');
    user.name = '李四'
}
// 定义一个函数addAge，用于增加user的age
function addAge() {
    console.log('+1岁');
    user.age++
}
// 定义一个函数replaceUser，用于替换user
function replaceUser() {
    console.log('换人，本质是修改了原有对象的属性，并没有将原有对象替换为新对象');
    Object.assign(user, {
        name: '王五',
        age: 20
    })
}

// 监视reactive数据，强制开启深度监视，当user的属性变化时也会触发回调函数
// 监视reactive数据时，深度监视不可关闭，当把deep设置为false时，修改user的name或age时一样会触发回调函数
// newValue和oldValue相同，且都是最新的user对象
watch(user, (newValue, oldValue) => {
    console.log('reactive监视，user变化了', newValue, oldValue)
})

</script>

<style></style>
