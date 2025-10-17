<template>
    <div v-for="num in [1,2,3,4,5,6]">
        <BrigadeEditor @changed="change" :num="num" />
    </div>
</template>

<script setup lang="ts">
import BrigadeEditor from './BrigadeEditor.vue';
const change = () => {
    console.log('change');
};
</script>

<style scoped>
</style>