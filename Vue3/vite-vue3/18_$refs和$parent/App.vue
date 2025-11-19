<template>
  <div>
    <h1 ref="appTitle">{{ title }}</h1>
    <!-- $refs为一个对象，包含所有的 ref 对象，除了 v-for 中定义的 ref 对象 -->
    <button @click="addUserAge($refs)">增加用户年龄</button>
    <User ref="userRef" />
    <!-- 在 v-for 中使用 ref 时，$refs 会是一个数组 -->
    <User v-for="index in 2" :key="index" ref="userRefs"></User>
  </div>
</template>

<script lang="ts" setup name="App">
import User from './components/User.vue';
import { ref } from 'vue';

const title = ref('App组件');

const appTitle = ref<HTMLHeadingElement>();
const userRef = ref<InstanceType<typeof User>>();
const userRefs = ref<InstanceType<typeof User>[]>([]);

function addUserAge(refs: any) {
  const userAge = userRef.value?.userData?.age || 0;
  if (userAge < 19) {
    console.log("$refs", refs);// 打印所有的 ref 对象，获取不到v-for 中的 userRefs
  }
  // 增加用户年龄
  // 可以通过 userRef.value 访问到 User 组件实例
  // userRef.value?.addAge();
  // 也可以通过 $refs 访问到 User 组件实例，此时不需要 .value
  refs["userRef"]?.addAge();
  // 增加 v-for 中用户的年龄
  userRefs.value.forEach(user => user?.addAge());
}

// 导出title，使子组件可以访问到
defineExpose({
  title
})
</script>

<style scoped></style>
