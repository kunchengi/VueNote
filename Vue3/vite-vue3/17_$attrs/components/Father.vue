<template>
    <div>
        <h1>我是父亲组件，我收到了我爸给我的：{{ giveSon.car }}和{{ giveSon.money }}，我爸让我把{{ $attrs }}给我儿子</h1>
        <My v-bind="$attrs" />
    </div>
</template>
 
<script lang="ts" setup name="Father">
import My from './My.vue'
defineProps(['giveSon']);
</script>

<style></style>