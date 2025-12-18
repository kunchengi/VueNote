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
                <el-dropdown-item v-for="item in options" :key="item.value" :value="item.value">{{ item.label
                    }}</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts" name="UserDropdown">
import { ArrowDown } from '@element-plus/icons-vue'

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
        value: 'patientManagement',
    },
    {
        label: '退出登录',
        value: 'logout',
    },
]
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