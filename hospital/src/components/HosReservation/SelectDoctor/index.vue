<template>
  <div class="select-doctor">
    <div class="select-doctor__title">
        <i :class="['iconfont', props.isMorning ? 'icon-shangwu' : 'icon-xiawu']"></i>
        <span>{{ props.isMorning ? '上午' : '下午' }}号源</span>
    </div>
    <div class="select-doctor__list">
        <div class="select-doctor__item">
            <div class="select-doctor__info">
                <div class="select-doctor__name">
                    <span>主任医师</span>
                    <span>|</span>
                    <span>张三</span>
                </div>
                <div class="select-doctor__intro">
                    <span>专治跌打损伤、骨质疏松等疑难杂症</span>
                </div>
            </div>
            <div class="select-doctor__select">
                <span>￥20</span>
                <el-button type="primary">剩余6</el-button>
            </div>
        </div>
        <div class="select-doctor__item">
            <div class="select-doctor__info">
                <div class="select-doctor__name">
                    <span>主任医师</span>
                    <span>|</span>
                    <span>张三</span>
                </div>
                <div class="select-doctor__intro">
                    <span>专治跌打损伤、骨质疏松等疑难杂症</span>
                </div>
            </div>
            <div class="select-doctor__select">
                <span>￥20</span>
                <el-button type="primary">剩余6</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="SelectDoctor">

type PropsType = {
    isMorning: boolean
}

const props = defineProps<PropsType>()
</script>

<style lang="scss" scoped>
.select-doctor {
    color: #7f7f7f;
    .select-doctor__title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        .iconfont {
            color: #55a6fe;
            margin-right: 5px;
        }
    }
    .select-doctor__list {
        .select-doctor__item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #e5e5e5;
            .select-doctor__info {
                .select-doctor__name {
                    font-size: 18px;
                    color: #55a6fe;
                    margin-bottom: 20px;
                    span {
                        margin-right: 5px;
                    }
                }
                .select-doctor__intro {
                   margin-bottom: 20px;
                }
            }
            .select-doctor__select {
                span {
                    color: #f5a824;
                    margin-right: 20px;
                }
            }
        }
    }
}
</style>