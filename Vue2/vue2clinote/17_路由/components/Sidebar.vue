<template>
    <div class="sidebar">
        <div v-for="course in courseList" :key="course.id">
            <!-- 跳转路由并携带query参数，to的字符串写法 -->
            <!-- <router-link active-class="active" :to="`${course.path}?id=${course.id}&content=${course.content}`">{{ course.name }}</router-link> -->
            <!-- 跳转路由并携带query参数，to的对象写法 -->
            <!-- <router-link active-class="active" :to="{
                path: `${course.path}`,
                query: {
                    id: course.id,
                    content: course.content
                }
            }">
                {{ course.name }}
            </router-link> -->
            <!-- 跳转路由并携带query参数，使用命名路由 -->
            <router-link active-class="active" :to="{
                name: `${course.name}`,// 跳转到对应名称的路由
                query: {
                    id: course.id,
                    content: course.content
                }
            }">
                {{ course.name }}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        courseList: {
            type: Array,
            default: () => []
        }
    }
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