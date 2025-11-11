<template>
    <div class="sidebar">
        <!-- <RouterLink active-class="active" :to="{ name: 'Vue' }">Vue路由</RouterLink>
        <RouterLink active-class="active" :to="{ name: 'Javascript' }">JavaScript路由</RouterLink> -->
        <div v-for="item in props.courseList" :key="item.id">
            <!-- 跳转路由并携带query参数，to的字符串写法 -->
            <!-- <RouterLink active-class="active" :to="`${item.path}?id=${item.id}&content=${item.content}`">{{ item.name }}</RouterLink> -->
            <!-- 跳转路由并携带query参数，to的对象写法 -->
            <!-- <RouterLink active-class="active" :to="{
                name: item.name,
                query: { id: item.id, content: item.content }
            }">{{ item.name }}</RouterLink> -->

            <!-- 跳转路由并携带params参数，to的字符串写法 -->
            <!-- <RouterLink active-class="active" :to="`${item.path}/${item.id}/${item.content}`">{{ item.name }}</RouterLink> -->
            <!-- 跳转路由并携带params参数，to的对象写法 -->
            <!-- <RouterLink active-class="active" :to="{
                name: item.name,// 必须使用name配置项
                params: { id: item.id, content: item.content }
            }" replace>{{ item.name }}</RouterLink> -->

            <!-- 点击时触发路由跳转 -->
            <a @click="handleClick(item)">
                {{ item.name }}
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup name="Sidebar">
import { defineProps } from 'vue';
type Props = {
    courseList: {
        id: string,
        name: string,
        path: string,
        content: string
    }[]
}
const props = defineProps<Props>();

import { useRouter } from 'vue-router';
const router = useRouter();

const handleClick = (course: any) => {
    // 编程式路由导航,也可以使用router.replace()
    // 区别: push是添加新的路由记录,replace是替换当前路由记录
    // 参数的写法与to的写法相同，可以写字符串也可以写对象
    router.push({
        // path: course.path,
        name: course.name,
        // query: { id: course.id, content: course.content }
        params: { id: course.id, content: course.content }
    })
}
</script>

<style>
.sidebar {
    width: 200px;
    background-color: #3e4551;
    color: white;
    padding: 20px;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.sidebar a{
    display: block;
    width: 100%;
    padding: 10px 0;
    margin: 10px 0;
    background-color: #61dafb;
    text-decoration: none;
    font-size: 16px;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
}

.sidebar a:hover {
    background-color: #4ecdc4;
}

.sidebar .active {
    background-color: #4ecdc4;
}
</style>