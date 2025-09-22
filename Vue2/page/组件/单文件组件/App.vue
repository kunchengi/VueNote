<template>
    <div>
        <School />
        <SchoolClass />
    </div>
</template>

<script>
import School from './School.vue'
import SchoolClass from './SchoolClass.vue'
export default {
    name: 'App',
    components: {
        School,
        SchoolClass
    }
}
</script>

<style></style>