<!-- 列表动画 -->
<template>
  <div>
    <input v-model="newItem" @keyup.enter="addItem">
    <button @click="addItem">添加</button>
    <!-- 将需要添加动画的多个元素包裹在 transition-group 组件中，并添加 name 属性指定动画名称（过渡类名前缀） -->
    <transition-group name="list" tag="ul">
      <li v-for="(item, index) in items" :key="item.id" class="list-item">
        {{ item.text }}
        <button @click="removeItem(index)">删除</button>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: '',
      items: [],
      nextId: 1
    }
  },
  methods: {
    addItem() {
      if (this.newItem.trim()) {
        this.items.push({
          id: this.nextId++,
          text: this.newItem
        })
        this.newItem = ''
      }
    },
    removeItem(index) {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style>
/* 定义进入和离开的初始状态 */
/* 开始状态和离开状态，透明度为0， translateY 30px */
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* 定义过渡样式，name-enter-active 和 name-leave-active 分别指定进入和离开过程的动画 */
/* 进入和离开过程，所有属性 平滑过渡 */
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

/* 确保离开的元素脱离文档流 */
.list-leave-active {
  position: absolute;
}

.list-item {
  padding: 10px;
  border: 1px solid #ddd;
  margin: 5px 0;
  position: relative;
}

.list-move {
  transition: transform 0.5s;
}
</style>