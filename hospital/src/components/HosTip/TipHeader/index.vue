<template>
    <div class="tip-header">
        <div class="tip-header__title">
          <slot name="titleIcon"></slot>
            <span>{{ title }}</span>
        </div>
        <div class="tip-header__all">
            <span>全部</span>
            <i class="iconfont icon-youjiantou"></i>
        </div>
    </div>
</template>

<script setup lang="ts" name="TipHeader">

const props = defineProps(['title'])
</script>

<style lang="scss" scoped>
.tip-header {
    color: #7f7f7f;
    display: flex;
    justify-content: space-between;

    .tip-header__title {
        display: flex;
        align-items: center;

        span {
            margin-left: 5px;
        }
    }

    .tip-header__all {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
            color: #55a6fe;
        }

        span {
            margin-right: 5px;
        }
    }
}
</style>