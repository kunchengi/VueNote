<template>
    <div class="hospital-detail">
        <top-title :hosname="hospitalDetailStore.hosname" :hostypeString="hospitalDetailStore.hostypeString" />
        <div class="hospital-detail__info">
            <logo-img :logoData="hospitalDetailStore.logoData" />
            <div class="hospital-detail__position">
                <el-icon class="hospital-detail__icon">
                    <Location />
                </el-icon>
                <div>
                    <div class="hospital-detail__address">
                        <span>具体位置：{{ hospitalDetailStore.fullAddress }}</span>
                    </div>
                    <div class="hospital-detail__route">
                        <span>交通指引：</span>
                        <p v-for="(item, index) in hospitalDetailStore.route" :key="index">{{ index + 1 }}. {{ item }}
                        </p>
                    </div>
                </div>

            </div>
        </div>
        <div class="hospital-detail__intro">
            <div class="hospital-detail__intro-title">医院介绍</div>
            <p class="hospital-detail__intro-text">{{ hospitalDetailStore.intro }}</p>
        </div>
    </div>
</template>

<script setup lang="ts" name="HospitalDetail">
// 引入仓库
import useHospitalDetailStore from '@/store/modules/hospitalDetail'
import TopTitle from '@/components/HosDetail/TopTitle/index.vue'
import LogoImg from '@/components/HosDetail/LogoImg/index.vue'
import { Location } from '@element-plus/icons-vue'

// 引入医院详情仓库
const hospitalDetailStore = useHospitalDetailStore();
</script>

<style lang="scss" scoped>
.hospital-detail {

    .hospital-detail__info {
        display: flex;
        
        .hospital-detail__icon {
            margin-top: 10px;
        }
        
        .hospital-detail__position {
            display: flex;
            margin-left: 20px;
            margin-top: 20px;

            .hospital-detail__address,
            .hospital-detail__route {
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

    .hospital-detail__intro {
        margin-top: 20px;

        .hospital-detail__intro-title {
            font-size: 18px;
            font-weight: bold;
        }

        .hospital-detail__intro-text {
            margin-top: 10px;
            color: #7f7f7f;
            line-height: 24px;
        }
    }
}
</style>