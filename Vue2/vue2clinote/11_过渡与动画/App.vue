<template>
  <div id="app">
    <fade-animate></fade-animate>
    <slide-animate></slide-animate>
    <list-animate></list-animate>
    <hooks-animate></hooks-animate>
    <animate-css></animate-css>
  </div>
</template>

<script>
import FadeAnimate from './components/FadeAnimate.vue'
import SlideAnimate from './components/SlideAnimate.vue'
import ListAnimate from './components/ListAnimate.vue'
import HooksAnimate from './components/HooksAnimate.vue'
import AnimateCss from './components/AnimateCss.vue'

export default {
  name: 'App',
  components: {
    FadeAnimate,
    SlideAnimate,
    ListAnimate,
    HooksAnimate,
    AnimateCss
  }
}
</script>

<style>

</style>
