<template>
    <div class="detail">
        <TopTitle :hosname="hospitalDetailStore.hosname" :hostypeString="hospitalDetailStore.hostypeString" />
        <div class="detail-info">
            <LogoImg :logoData="hospitalDetailStore.logoData" />
            <div class="right">
                <el-icon class="icon">
                    <Location />
                </el-icon>
                <div>
                    <div class="address">
                        <span>具体位置：{{ hospitalDetailStore.fullAddress }}</span>
                    </div>
                    <div class="route">
                        <span>交通指引：</span>
                        <p v-for="(item, index) in hospitalDetailStore.route" :key="index">{{ index + 1 }}. {{ item }}
                        </p>
                    </div>
                </div>

            </div>
        </div>
        <div class="intro">
            <div class="title">医院介绍</div>
            <p class="content">{{ hospitalDetailStore.intro }}</p>
        </div>
    </div>
</template>

<script setup lang="ts" name="Detail">
// 引入仓库
import useHospitalDetailStore from '@/store/modules/hospitalDetail'
import TopTitle from '@/components/hospital_detail/top_title/index.vue'
import LogoImg from '@/components/hospital_detail/logo_img/index.vue'
import { Location } from '@element-plus/icons-vue'

// 引入医院详情仓库
const hospitalDetailStore = useHospitalDetailStore();
</script>

<style lang="scss" scoped>
.detail {

    .detail-info {
        display: flex;
        
        .icon {
            margin-top: 10px;
        }
        
        .right {
            display: flex;
            margin-left: 20px;
            margin-top: 20px;

            .address,
            .route {
                margin-top: 10px;
                color: #7f7f7f;

                span {
                    margin-right: 10px;
                }

                p {
                    margin-left: 10px;
                    margin-top: 5px;
                    line-height: 24px;
                }
            }
        }
    }

    .intro {
        margin-top: 20px;

        .title {
            font-size: 18px;
            font-weight: bold;
        }

        .content {
            margin-top: 10px;
            color: #7f7f7f;
            line-height: 24px;
        }
    }
}
</style>