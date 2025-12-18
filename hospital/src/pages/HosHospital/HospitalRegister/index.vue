<template>
    <div class="hospital-register">
        <!-- 顶部标题 -->
        <top-title :hosname="hospitalDetailStore.hosname" :hostypeString="hospitalDetailStore.hostypeString" />
        <!-- 挂号信息区域 -->
         <div class="hospital-register__info">
            <logo-img :logoData="hospitalDetailStore.logoData" />
            <div class="hospital-register__rule">
                <div class="hospital-register__title">挂号规则</div>
                <div class="hospital-register__item">
                    <span>预约周期：{{ hospitalDetailStore.bookingRule?.cycle || '' }}天</span>
                    <span>放号时间：{{ hospitalDetailStore.bookingRule?.releaseTime || '' }}</span>
                    <span>停挂时间：{{ hospitalDetailStore.bookingRule?.stopTime || '' }}</span>
                </div>
                <div class="hospital-register__item">
                    <span>医院地址：{{ hospitalDetailStore.fullAddress }}</span>
                </div>
                <div class="hospital-register__item">
                    <span>交通指引：</span>
                    <p v-for="(item, index) in hospitalDetailStore.route" :key="index">{{ index + 1 }}. {{ item }}</p>
                </div>
                <div class="hospital-register__item">
                    <span>退号时间：就诊前一工作日{{ hospitalDetailStore.bookingRule?.quitTime || '' }}前取消</span>
                </div>
                <div class="hospital-register__item">
                    <span>预约规则：</span>
                    <p v-for="(item, index) in hospitalDetailStore.ruleList" :key="index">{{ index + 1 }}. {{ item }}</p>
                </div>
            </div>
         </div>
         <!-- 科室选择区域 -->
         <div class="hospital-register__department">
            <div class="hospital-register__nav">
                <el-anchor
                    :container="containerRef"
                    direction="vertical"
                    type="default"
                    :offset="0"
                    @click="handleClick"
                    @change="handleChange"
                    :select-scroll-top="true"
                    class="hospital-register__anchor"
                >
                    <el-anchor-link v-for="item in hospitalDetailStore.departmentList" :key="item.depcode" :href="`#${item.depname}`" :title="item.depname"  :class="{'hospital-register__anchor--active': item.depname === activeDepartment}"/>
                </el-anchor>
            </div>

            <div class="hospital-register__department-list" ref="containerRef">
                <div class="hospital-register__sub-department" v-for="item in hospitalDetailStore.departmentList" :key="item.depcode" :id="item.depname">
                    <div class="hospital-register__sub-department-name">{{ item.depname }}</div>
                    <div class="hospital-register__sub-department-list">
                        <div class="hospital-register__sub-department-item" v-for="subItem in item.children" :key="subItem.depcode" @click="onClickSubDepartment(subItem.depcode)">{{ subItem.depname }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="HospitalRegister">
// 引入仓库
import useHospitalDetailStore from '@/store/modules/hospitalDetail'
import useUiManageStore from '@/store/modules/uiManage'
import TopTitle from '@/components/HosDetail/TopTitle/index.vue'
import LogoImg from '@/components/HosDetail/LogoImg/index.vue'
import { ref, watch } from 'vue'

// 引入医院详情仓库
const hospitalDetailStore = useHospitalDetailStore();
// 不能通过以下方式获取医院详情数据，因为会丢失响应式
// const hospitalDetail: Hospital = hospitalDetailStore.hospitalDetail;

// 定义容器引用
const containerRef = ref<HTMLDivElement | null>(null);
// 定义当前选中的科室
const activeDepartment = ref<string>(hospitalDetailStore.departmentList[0]?.depname || '');

// 监听科室列表变化，确保activeDepartment始终有值
watch(() => hospitalDetailStore.departmentList, (newList) => {
    if (newList.length > 0 && !activeDepartment.value) {
        const firstItem = newList[0];
        if (firstItem) {
            activeDepartment.value = firstItem.depname;
        }
    }
}, { immediate: true });

// 点击锚点时阻止默认行为，从而不会更改历史记录。
const handleClick = (e: MouseEvent) => {
    // 如果不阻止默认行为，点击锚点时会path后面会加上#锚点的href
    e.preventDefault();
    // 点击锚点跳转到对应的位置，也可以通过原生的scrollIntoView方法实现。会滚动对应元素到顶部
    // const target = document.querySelector(href);
    // if (target) {
    //     target.scrollIntoView({ behavior: 'smooth' });
    // }
}

// 改变锚点时滚动到对应的位置
const handleChange = (href: string) => {
    // 改变锚点时，更新当前选中的科室
    activeDepartment.value = href.replace('#', '');
}


// 引入登录弹窗状态管理仓库
const uiManageStore = useUiManageStore();

// 点击子科室时调用
const onClickSubDepartment = (depcode: string) => {
    uiManageStore.showLogin = true;
}
</script>

<style lang="scss" scoped>
.hospital-register {
    /* 挂号信息区域 */
    .hospital-register__info {
        display: flex;
        .hospital-register__rule {
            margin-left: 20px;
            margin-top: 20px;
            .hospital-register__title {
                font-size: 20px;
            }
            .hospital-register__item {
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
    /* 科室选择区域 */
    .hospital-register__department {
        display: flex;
        height: 500px;
        color: #7f7f7f;
        margin-top: 50px;
        .hospital-register__nav {
            width: 80px;
            background-color: #f8f8f8;
            .hospital-register__anchor {
                background-color: #f8f8f8;
                :deep(.el-anchor__list){
                    padding-left: 0px;
                }
                :deep(.el-anchor__item){
                    padding: 5px;
                    text-align: center;
                }
                :deep(.el-anchor__link){
                    font-size: 14px;
                    font-weight: bold;
                }
                .hospital-register__anchor--active {
                    background-color: #fff;
                }
            }
        }
        .hospital-register__department-list {
            flex: 1;
            overflow: auto;
            // 隐藏滚动条
            &::-webkit-scrollbar {
                display: none;
            }
            .hospital-register__sub-department {
                display: flex;
                flex-direction: column;
                .hospital-register__sub-department-name {
                    font-weight: bold;
                    background-color: #f8f8f8;
                    padding: 10px 5px;
                }
                .hospital-register__sub-department-list {
                    margin-top: 10px;
                    margin-left: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    // 每行显示3个
                    .hospital-register__sub-department-item {
                        width: 33%;
                        padding: 10px 0;
                        cursor: pointer;
                        &:hover {
                            color: #409eff;
                        }
                    }
                }
            }
        }
    }
}
</style>