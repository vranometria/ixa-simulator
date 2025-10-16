<template>
    
    <img :src="image" alt="Unit Image" />
    <select class="item">
        <option v-for="t in busyoStore.idAndNames" :key="t.id" :value="t.id">{{ t.name }}</option>
    </select>
    <select class="item">
        <option v-for="type in SoldierTypeNames" :key="type" :value="type">{{ type }}</option>
    </select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBusyoStore } from './store/busyoStore';
import { SoldierTypeNames } from './SoldierType';

const image = ref("./assets/someone.png");
const busyoStore = useBusyoStore();
</script>


<style scoped>
img {
    width: 100px;
    height: 100px;
}

.item {
    display: block;
}
</style>