<template>
  <div id="app">
    <PhoneList :phoneList="phoneList" />
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
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
    // 订阅 buyPhone 事件，并将事件对象保存起来
    this.$buyPhone = pubsub.subscribe('buyPhone', this.onBuyPhone);
  },
  beforeDestroy() {
    // 取消订阅 buyPhone 事件
    pubsub.unsubscribe(this.$buyPhone)
  },
  methods: {
    onBuyPhone(eventName, phone) {
      console.log('事件名为', eventName);
      console.log('购买了', phone.name);
    }
  }
}
</script>

<style></style>
