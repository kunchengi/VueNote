<template>
  <div id="app">
    <div>
      用户名：{{ userInfo.name }}
      年龄：{{ userInfo.age }}
      邮箱：{{ userInfo.email }}
    </div>
    <div>
      {{ getUserInfo() }}
    </div>
    <div>
      {{ leftNum }} + {{ rightNum }} = {{ result }}
    </div>
    <div v-if="weatherInfo">
      <p>城市：{{ weatherInfo.province + weatherInfo.city }}</p>
      <p>天气：{{ weatherInfo.weather }}</p>
      <p>温度：{{ weatherInfo.temperature }}</p>
    </div>
  </div>
</template>

<script>
// 引入自定义的mixin
import { mathMixin, apiMixin, userMixin } from './mixins/userMixin'

export default {
  name: 'App',
  mixins: [mathMixin, apiMixin, userMixin],
  data() {
    return {
      userInfo: {
        name: '张三',
        age: 18
      },
      leftNum: 10,
      rightNum: 20,
      result: 0,
      weatherInfo: null
    }
  },
  created() {
    console.log('App created')
    // 调用自定义的mixin方法
    // 这个接口只能再8081端口访问
    this.callApi('https://restapi.amap.com/v3/weather/weatherInfo?key=c546098386e1ca8d46578977e40ab440&city=440106')
      .then(data => {
        this.weatherInfo = data.lives[0];
      })
  },
  mounted() {
    // 调用自定义的mixin方法
    this.result = this.add(this.leftNum, this.rightNum)
  },
  methods: {
    // 同名方法、计算属性、指令，以组件的优先
    getUserInfo() {
      return this.userInfo.name + ' (年龄：' + this.userInfo.age + ') (邮箱：' + this.userInfo.email + ')'
    }
  }
}
</script>

<style>

</style>
