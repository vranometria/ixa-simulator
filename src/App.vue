<template>
    <BusyoEditor />
</template>

<script setup lang="ts">
import BusyoEditor from './BusyoEditor.vue';
import { useBusyoStore } from './store/busyoStore';
import UnitEdit from './UnitEdit.vue';
const busyoStore = useBusyoStore();
</script>