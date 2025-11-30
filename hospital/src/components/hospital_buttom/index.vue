<template>
    <div class="buttom">
        <div class="content">
            <div class="left">
                京ICP备 2023000000号 电话挂号010-88888888
            </div>
            <div class="right">
                <span>联系我们</span>
                <span>合作伙伴</span>
                <span>用户协议</span>
                <span>隐私协议</span>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.buttom {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;

    .content {
        width: 1200px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #999;
        
        .right{
            span{
                margin: 0px 5px;
            }
        }
    }
}
</style>