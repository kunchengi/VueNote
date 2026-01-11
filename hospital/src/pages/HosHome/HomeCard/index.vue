<template>
    <el-card shadow="hover" @click="handleClick">
        <div class="home-card__content">
            <div class="home-card__info">
                <div class="home-card__name">
                    {{hospitalInfo.hosname}}
                </div>
                <div class="home-card__detail">
                    <div class="home-card__level">
                        <i class="iconfont icon-dianzan"></i>
                        <span>{{hospitalInfo.param.hostypeString}}</span>
                    </div>
                    <div class="home-card__time">
                        <el-icon><Timer /></el-icon>
                        <span>每天{{hospitalInfo.bookingRule.releaseTime}}放号</span>
                    </div>
                </div>
            </div>
            <div class="home-card__logo">
                <img :src="hospitalInfo.logoData" alt="">
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts" name="HomeCard">
import { Timer } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const props = defineProps(['hospitalInfo'])

// 初始化 Vue Router 实例
const router = useRouter()

// 处理点击事件，跳转详情页
const handleClick = () => {
    // 使用 Vue Router 跳转详情页，传递医院编码作为参数
    router.push({
      path: '/hospital/register/info',
      query: {
        hoscode: props.hospitalInfo.hoscode
      }
    })
}
</script>

<style lang="scss" scoped>
.home-card__content{
    display: flex;
    justify-content: space-between;
    .home-card__info{
        width: 60%;
        .home-card__detail{
            color: #7f7f7f;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            .home-card__level,.home-card__time{
                display: flex;
                align-items: center;
                span{
                    margin-left: 5px;
                }
            }
        }
    }
    .home-card__logo{
        img{
            width: 50px;
            height: 50px;
        }
    }
}
</style>