<script lang="ts">
  import Person from './components/Person.vue'
  import User from './components/User.vue'
  export default {
    name: 'App',
    components: {
      Person,
      User,
    },
  }
</script>

<template>
  <div>
    <Person />
    <User />
  </div>
</template>

<style scoped>
</style>
