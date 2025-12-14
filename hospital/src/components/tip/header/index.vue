<template>
    <div class="header">
        <div class="left">
          <slot name="leftIcon"></slot>
            <span>{{ title }}</span>
        </div>
        <div class="right">
            <span>全部</span>
            <i class="iconfont icon-youjiantou"></i>
        </div>
    </div>
</template>

<script setup lang="ts" name="Department">

const props = defineProps(['title'])
</script>

<style lang="scss" scoped>
.header {
    color: #7f7f7f;
    display: flex;
    justify-content: space-between;

    .left {
        display: flex;
        align-items: center;

        span {
            margin-left: 5px;
        }
    }

    .right {
        display: flex;
        align-items: center;
        cursor: pointer;

        span {
            margin-right: 5px;
        }
    }
}
</style>