<!-- 展示用户名称和下拉菜单 -->
<template>
    <el-dropdown>
        <div class="user-dropdown__info">
            <span>{{ userName }}</span>
            <el-icon>
                <arrow-down />
            </el-icon>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="item in options" :key="item.value" :value="item.value" @click="handleClick(item.value)">
                    {{ item.label }}</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts" name="UserDropdown">
import { ArrowDown } from '@element-plus/icons-vue'
import useUserDataStore from '@/store/modules/userData'
import useUiManageStore from '@/store/modules/uiManage'
import { useRouter } from 'vue-router'

const router = useRouter();

const userDataStore = useUserDataStore();
const uiManageStore = useUiManageStore();

const props = defineProps({
    userName: {
        type: String,
        default: () => '',
    },
})

// 下拉菜单选项
const options = [
    {
        label: '实名认证',
        value: 'realNameAuth',
    },
    {
        label: '挂号订单',
        value: 'registrationOrder',
    },
    {
        label: '就诊人管理',
        value: 'patientManage',
    },
    {
        label: '退出登录',
        value: 'logout',
    },
]

// 点击下拉菜单选项
const handleClick = (value: string) => {
    let path = '';
    switch (value) {
        case 'realNameAuth':
            // 实名认证
            path = '/user/realNameAuth';
            break;
        case 'registrationOrder':
            // 挂号订单
            path = '/user/registrationOrder';
            break;
        case 'patientManage':
            // 就诊人管理
            path = '/user/patientManage/mgr';
            break;
        case 'logout':
            // 退出登录
            userDataStore.clearUserInfo();
            uiManageStore.showLogin = true;
            break;
        default:
            break;
    }
    if (path) {
        router.push({
            path: path
        })
    }
}
</script>

<style lang="scss" scoped>
.user-dropdown__info {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        margin-right: 5px;
    }
}
</style>