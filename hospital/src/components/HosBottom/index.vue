<template>
    <div class="hos-buttom">
        <div class="hos-buttom__content">
            <div class="hos-buttom__copyright">
                京ICP备 2023000000号 电话挂号010-88888888
            </div>
            <div class="hos-buttom__link-group">
                <span class="hos-buttom__link" v-for="item in links" :key="item.id">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="HosBottom">
import { reactive } from 'vue'

const links = reactive([
    {
        name: '联系我们',
        id: 1
    },
    {
        name: '合作伙伴',
        id: 2
    },
    {
        name: '用户协议',
        id: 3
    },
    {
        name: '隐私协议',
        id: 4
    }
])
</script>

<style lang="scss" scoped>
.hos-buttom {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;

    .hos-buttom__content {
        width: 1200px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #999;
        
        .hos-buttom__link-group{
            .hos-buttom__link{
                margin: 0px 5px;
                cursor: pointer;
                &:hover{
                    color: #55a6fe;
                }
            }
        }
    }
}
</style>