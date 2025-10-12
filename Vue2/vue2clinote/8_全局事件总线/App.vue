<template>
  <div id="app">
    <PhoneList :phoneList="phoneList" />
  </div>
</template>

<script>
import PhoneList from './components/PhoneList.vue';

export default {
  name: 'App',
  components: {
    PhoneList
  },
  data() {
    return {
      phoneList: [
        { id: 1, name: 'iPhone 17', price: 5999 },
        { id: 2, name: '小米 17', price: 4999 },
        { id: 3, name: '华为 meta 50', price: 7999 }
      ]
    }
  },
  mounted() {
    // 组件挂载完成后，订阅全局事件总线的事件
    // 监听 buyPhone 事件
    this.$bus.$on('buyPhone', this.onBuyPhone)
    // 只监听一次 buy 事件
    this.$bus.$once('buy', this.onBuyPhone);
  },
  beforeDestroy() {
    // 组件销毁前，取消订阅全局事件总线的事件
    // 取消监听 buyPhone 事件
    this.$bus.$off('buyPhone', this.onBuyPhone)
    // 取消监听 buy 事件
    this.$bus.$off('buy', this.onBuyPhone);
  },
  methods: {
    onBuyPhone(phone) {
      console.log('购买了', phone.name);
    }
  }
}
</script>

<style></style>
