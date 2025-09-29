<template>
    <div>
        <h1 v-if="showName" ref="schoolName" :style="{ color: color }">学校名称：{{ name }}</h1>
        <h1>学校地址：{{ address }}</h1>
        <button @click="changeSchoolNameColor">修改学校名称的字体颜色</button>
        <button @click="toggleSchoolName">显示/隐藏学校名称</button>
        <div v-for="student in students" :key="student.name" ref="studentListRef">
            {{ student.name }} - {{ student.age }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'School',
    data() {
        return {
            showName: true,
            name: '清华大学',
            address: '北京',
            color: 'red',
            students: [
                { name: '张三', age: 18 },
                { name: '李四', age: 19 },
                { name: '王五', age: 20 },
            ]
        }
    },
    methods: {
        toggleSchoolName() {
            this.showName = !this.showName;
        },
        changeSchoolNameColor() {
            // 如果元素被v-if隐藏，this.$refs.schoolName会变为undefined，需要判空
            if(!this.$refs.schoolName){
                console.log('元素不存在，修改失败！');
                return;
            }
            console.log(this.$refs.schoolName);// <h1 style="color: red;">学校名称：学校名称</h1>
            // this.$refs.schoolName.style.color = 'red';
            // 修改颜色体现异步更新问题
            this.color = 'blue';
            // 由于 Vue 的更新是异步的，此时ref中的数据还未更新
            console.log(this.$refs.schoolName.style.color); // red
            // 需要 $nextTick 来确保 ref 已更新
            this.$nextTick(() => {
                console.log(this.$refs.schoolName.style.color); // blue
            })
        },
        changeSchoolAddress() {
            this.address = '上海';
        }
    },
    mounted() {
        // 组件挂载完成后，打印学生列表的DOM元素
        console.log(this.$refs.studentListRef);// 输出：[div, div, div]
    }
}
</script>

<style></style>