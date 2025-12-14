<template>
    <div class="deparment">
        <Header title="常见科室">
            <template #leftIcon>
                <i class="iconfont icon-icon"></i>
            </template>
        </Header>
        <div class="content">
            <ul>
                <li>神经内科</li>
                <li>消化内科</li>
                <li>呼吸内科</li>
                <li>内科</li>
                <li>神经外科</li>
                <li>妇科</li>
                <li>产科</li>
                <li>儿科</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts" name="Department">
import Header from '@/components/tip/header/index.vue'
</script>

<style lang="scss" scoped>
.deparment {
    color: #7f7f7f;

    .content {
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            li {
                width: 40%;
                margin-top: 20px;
                cursor: pointer;
            }
        }
    }

    .iconfont {
        color: #13227a;
    }
}
</style>