<template>
  <div id="app">
    <parent-component />
  </div>
</template>

<script>
import ParentComponent from './components/ParentComponent.vue'

export default {
  name: 'App',
  components: {
    ParentComponent
  }
}
</script>

<style></style>
