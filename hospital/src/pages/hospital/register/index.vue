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
         <!-- 科室选择区域 -->
         <div class="department">
            <div class="leftNav">
                <el-anchor
                    :container="containerRef"
                    direction="vertical"
                    type="default"
                    :offset="0"
                    @click="handleClick"
                    @change="handleChange"
                    :select-scroll-top="true"
                    class="anchor"
                >
                    <el-anchor-link v-for="item in hospitalDetailStore.departmentList" :key="item.depcode" :href="`#${item.depname}`" :title="item.depname"  :class="{'active': item.depname === activeDepartment}"/>
                </el-anchor>
            </div>

            <div class="departmentList" ref="containerRef">
                <div class="subDepartment" v-for="item in hospitalDetailStore.departmentList" :key="item.depcode" :id="item.depname">
                    <div class="title">{{ item.depname }}</div>
                    <div class="subDepartmentList">
                        <div class="subDepartmentItem" v-for="(subItem, subIndex) in item.children" :key="subIndex">{{ subItem.depname }}</div>
                    </div>
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
    /* 科室选择区域 */
    .department {
        display: flex;
        height: 500px;
        color: #7f7f7f;
        margin-top: 50px;
        .leftNav {
            width: 80px;
            background-color: #f8f8f8;
            .anchor {
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
                .active {
                    background-color: #fff;
                }
            }
        }
        .departmentList {
            flex: 1;
            overflow: auto;
            // 隐藏滚动条
            &::-webkit-scrollbar {
                display: none;
            }
            .subDepartment {
                display: flex;
                flex-direction: column;
                .title {
                    font-weight: bold;
                    background-color: #f8f8f8;
                    padding: 10px 5px;
                }
                .subDepartmentList {
                    margin-top: 10px;
                    margin-left: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    // 每行显示3个
                    .subDepartmentItem {
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