<template>
    <el-card shadow="hover" @click="handleClick">
        <div class="content">
            <div class="left">
                <div class="hospital-name">
                    {{hospitalInfo.hosname}}
                </div>
                <div class="tip">
                    <div class="level">
                        <i class="iconfont icon-dianzan"></i>
                        <span>{{hospitalInfo.param.hostypeString}}</span>
                    </div>
                    <div class="time">
                        <el-icon><Timer /></el-icon>
                        <span>每天{{hospitalInfo.bookingRule.releaseTime}}放号</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <img :src="hospitalInfo.logoData" alt="">
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts" name="Card">
import { Timer } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const props = defineProps(['hospitalInfo'])

// 初始化 Vue Router 实例
const router = useRouter()

// 处理点击事件，跳转详情页
const handleClick = () => {
    // 使用 Vue Router 跳转详情页，传递医院编码作为参数
    router.push({
      path: '/hospital/register',
      query: {
        hoscode: props.hospitalInfo.hoscode
      }
    })
}
</script>

<style lang="scss" scoped>
.content{
    display: flex;
    justify-content: space-between;
    .left{
        width: 60%;
        .tip{
            color: #7f7f7f;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            .level,.time{
                display: flex;
                align-items: center;
                span{
                    margin-left: 5px;
                }
            }
        }
    }
    .right{
        img{
            width: 50px;
            height: 50px;
        }
    }
}
</style>