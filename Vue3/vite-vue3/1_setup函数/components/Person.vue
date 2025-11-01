<template>
  <div>
    <h1>Person组件</h1>
    <h2>name：{{ name }}</h2>
    <h2>userName：{{ userName }}</h2>
    <h2>age：{{ age }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">显示电话</button>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Person',
    setup() {
      console.log('先执行setup函数');
      console.log(this); // undefined，因为setup函数在beforeCreate钩子之前执行，此时组件实例还未创建

      // 定义数据
      let name = '张三';
      let age = 18;
      let tel = '12345678901';

      // 定义方法
      // 如果没用ref包裹，那么数据不是响应式的，即时修改了数据，页面也不会更新。后面会讲到ref和reactive创建响应式数据
      function changeName() {
        name = '李四';
      }
      function changeAge() {
        age++;
      }
      function showTel() {
        alert(tel);
      }

      // 返回数据和方法
      // 如果返回一个函数，页面直接渲染函数的返回值，一般不会这么用
      // return ()=>"hello vue3"
      // 如果返回一个对象，在模板中可以直接使用对象的属性
      return {
        name,
        age,
        tel,
        changeName,
        changeAge,
        showTel,
      }
    },
    beforeCreate() {
      console.log('再执行beforeCreate钩子');
    },
    data() {
      return {
        name: '王五',// 如果在data和setup中都定义了相同名称的数据，那么谁写在后，就以谁为准
        userName: this.name,// 在data中可以通过this访问setup中的数据
      }
    },
  }
</script>
<style scoped></style>