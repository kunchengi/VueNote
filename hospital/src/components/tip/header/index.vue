<template>
    <div class="header">
        <div class="left">
          <slot name="leftIcon"></slot>
            <span>{{ title }}</span>
        </div>
        <div class="right">
            <span>全部</span>
            <svg t="1765373860116" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="11094" width="16" height="16">
                <path
                    d="M307.6 104.6c-14.2 14.2-14.2 37.2 0 51.4L655 503.4c2.8 2.9 2.8 7.5 0 10.3L307.6 861.2c-14.2 14.2-14.2 37.2 0 51.4 14.2 14.2 37.2 14.2 51.4 0l347.4-347.4c15.6-15.6 23.4-36 23.4-56.5s-7.8-41-23.4-56.5L359 104.6c-14.2-14.2-37.2-14.2-51.4 0z"
                    p-id="11095"></path>
            </svg>
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