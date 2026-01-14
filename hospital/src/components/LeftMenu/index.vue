<template>
    <!-- 左侧导航区域 -->
    <div class="menu-container">
        <div class="menu-title">
            <el-icon>
                <component :is="titleData.icon" />
            </el-icon>
            <span>/ {{ titleData.name }}</span>
        </div>
        <el-menu :default-active="selectedPath || menuList?.[0]?.index || ''" class="el-menu-vertical-demo">
            <el-menu-item v-for="item in menuList" :key="item.index" :index="item.index"
                @click="onChangeActive($event)">
                <el-icon>
                    <component :is="item.icon" />
                </el-icon>
                <span>{{ item.name }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup lang="ts" name="LeftMenu">

type Props = {
    menuList: {
        index: string;
        name: string;
        icon: any;
    }[];
    titleData: {
        icon: any;
        name: string;
    }
    selectedPath?: string;
}

const props = defineProps<Props>()

// 定义事件
const emit = defineEmits(['changeActive'])

const onChangeActive = ($event: any) => {
    emit('changeActive', $event.index)
}
</script>

<style lang="scss" scoped>
.menu-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #7f7f7f;
}
</style>