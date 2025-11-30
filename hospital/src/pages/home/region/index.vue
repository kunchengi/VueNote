<template>
  <div class="region">
    <div class="content">
        <div class="left">地区：</div>
        <ul class="right">
            <li class="active">全部</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
            <li>昌平区</li>
        </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="Region">
</script>

<style lang="scss" scoped>
.region{
    color: #7f7f7f;
    margin-top: 10px;
    .content{
        display: flex;
        .left{
            margin-right: 10px;
            width: 53px;
        }
        .right{
            display: flex;
            flex-wrap: wrap;
            li{
                margin-right: 10px;
                margin-bottom: 10px;
                &.active{
                    color: #55a6fe;
                }
                &:hover{
                    color: #55a6fe;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>