<template>
    <div>
        <!-- 父子组件双向通信：当输入框的值发生改变时，通知父组件更新userEmail -->
        <div v-if="!isVModel">
            <span>子组件输入邮箱（不使用v-model）：</span>
            <input :value="email" @input="emit('input-change', ($event.target as HTMLInputElement).value)">
        </div>
        <!-- 父子组件双向通信：当使用v-model时，需要监听update:modelValue事件，更新modelValue属性 -->
        <div v-else>
            <span>子组件输入邮箱（使用v-model）：</span>
            <input :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)">
        </div>
    </div>
</template>

<script lang="ts" setup name="InputCom">
const props = defineProps({
    email: String,
    isVModel: Boolean,
    modelValue: String// 当使用v-model时，需要定义modelValue属性，接收v-model绑定的值
})

// 定义事件
const emit = defineEmits(['input-change', 'update:modelValue'])
</script>

<style></style>