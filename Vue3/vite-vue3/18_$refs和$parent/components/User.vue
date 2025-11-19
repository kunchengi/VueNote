<template>
    <div>
        <h3>用户信息</h3>
        <p>用户名：{{ userData.name }}</p>
        <p>用户年龄：{{ userData.age }}</p>
        <!-- $parent为父组件的实例 -->
        <button @click="changeTitle($parent)">改变父组件标题</button>
    </div>
</template>
 
<script lang="ts" setup name="User">
import { reactive, ref } from 'vue';

const userData = reactive({
    name: '张三',
    age: ref(18)// 可以这么写，也可以写成age: 18。都是响应式的
});

function addAge() {
    // 访问reactive里的ref属性时，不需要.value，编译器会自动添加
    userData.age++;
}

function changeTitle(parent: any) {
    console.log('$parent', parent);
    parent.title = '用户组件';
}

// 导出userData和addAge，使父组件可以访问到
defineExpose({
    userData,
    addAge
})
</script>

<style></style>