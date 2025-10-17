<template>
    <BusyoEditor />

    <FormationEditor />
</template>

<script setup lang="ts">
import BusyoEditor from './BusyoEditor.vue';
import FormationEditor from './FormationEditor.vue';
import { useBusyoStore } from './store/busyoStore';
const busyoStore = useBusyoStore();
</script>