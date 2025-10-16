<template>
    <BusyoEditor />
</template>

<script setup lang="ts">
import BusyoEditor from './BusyoEditor.vue';
import { useBusyoStore } from './store/busyoStore';
const busyoStore = useBusyoStore();
</script>