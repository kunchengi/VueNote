<template>
    <div class="register">
        <!-- 顶部标题 -->
        <TopTitle :hosname="hospitalDetailStore.hosname" :hostypeString="hospitalDetailStore.hostypeString" />
        <!-- 挂号信息区域 -->
         <div class="register-info">
            <LogoImg :logoData="hospitalDetailStore.logoData" />
            <div class="right">
                <div class="rule-title">挂号规则</div>
                <div class="rule">
                    <span>预约周期：{{ hospitalDetailStore.bookingRule?.cycle || '' }}天</span>
                    <span>放号时间：{{ hospitalDetailStore.bookingRule?.releaseTime || '' }}</span>
                    <span>停挂时间：{{ hospitalDetailStore.bookingRule?.stopTime || '' }}</span>
                </div>
                <div class="rule">
                    <span>医院地址：{{ hospitalDetailStore.fullAddress }}</span>
                </div>
                <div class="rule">
                    <span>交通指引：</span>
                    <p v-for="(item, index) in hospitalDetailStore.route" :key="index">{{ index + 1 }}. {{ item }}</p>
                </div>
                <div class="rule">
                    <span>退号时间：就诊前一工作日{{ hospitalDetailStore.bookingRule?.quitTime || '' }}前取消</span>
                </div>
                <div class="rule">
                    <span>预约规则：</span>
                    <p v-for="(item, index) in hospitalDetailStore.ruleList" :key="index">{{ index + 1 }}. {{ item }}</p>
                </div>
            </div>
         </div>
    </div>
</template>

<script setup lang="ts" name="Register">
// 引入仓库
import useHospitalDetailStore from '@/store/modules/hospitalDetail'
import TopTitle from '@/components/hospital_detail/top_title/index.vue'
import LogoImg from '@/components/hospital_detail/logo_img/index.vue'

// 引入医院详情仓库
const hospitalDetailStore = useHospitalDetailStore();
// 不能通过以下方式获取医院详情数据，因为会丢失响应式
// const hospitalDetail: Hospital = hospitalDetailStore.hospitalDetail;
</script>

<style lang="scss" scoped>
.register {
    /* 挂号信息区域 */
    .register-info {
        display: flex;
        .right {
            margin-left: 20px;
            margin-top: 20px;
            .rule-title {
                font-size: 20px;
            }
            .rule {
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
}
</style>