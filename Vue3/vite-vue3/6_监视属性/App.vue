<script lang="ts">
import WatchRefBaseData from './components/WatchRefBaseData.vue'
import WatchRefObject from './components/WatchRefObject.vue'
import WatchReactive from './components/WatchReactive.vue'
import WatchRefObjAttr from './components/WatchRefObjAttr.vue'
import WatchReactiveAttr from './components/WatchReactiveAttr.vue'
import WatchMultiple from './components/WatchMultiple.vue'

export default {
  name: 'App',
  components: {
    WatchRefBaseData,
    WatchRefObject,
    WatchReactive,
    WatchRefObjAttr,
    WatchReactiveAttr,
    WatchMultiple
  }
}
</script>

<template>
  <div>
    <WatchRefBaseData />
    <WatchRefObject />
    <WatchReactive />
    <WatchRefObjAttr />
    <WatchReactiveAttr />
    <WatchMultiple />
  </div>
</template>

<style scoped></style>
