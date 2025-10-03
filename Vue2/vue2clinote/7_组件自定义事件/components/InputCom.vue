<template>
    <div>
        <!-- 父子组件双向通信：当输入框的值发生改变时，通知父组件更新userEmail -->
        <div v-if="!isSync">
            <span>子组件输入邮箱（不使用.sync）：</span>
            <input :value="email" @input="$emit('input-change', $event.target.value)">
        </div>
        <div v-if="isSync">
            <span>子组件输入邮箱（使用.sync，事件需要为update:xxx）：</span>
            <input :value="email" @input="$emit('update:email', $event.target.value)">
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputCom',
    props: {
        email: String,
        isSync: Boolean
    }
}
</script>

<style></style>