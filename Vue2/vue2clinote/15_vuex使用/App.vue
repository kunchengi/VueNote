<template>
  <div id="app">
    <Count />
    <User />
  </div>
</template>

<script>
import Count from './components/Count.vue'
import User from './components/User.vue'

export default {
  name: 'App',
  components: {
    Count,
    User
  }
}
</script>

<style>

</style>
