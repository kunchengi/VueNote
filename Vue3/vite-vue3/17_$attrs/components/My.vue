<template>
    <div>
        <h1>我是孙子组件，我收到了我爷爷给我的：{{ giveGrandson.car }}和{{ giveGrandson.money }}</h1>
    </div>
</template>
 
<script lang="ts" setup name="Father">
defineProps(['giveGrandson']);
</script>

<style></style>