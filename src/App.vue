<template>
    <div class="tabs">
        <div :class="'tab ' + selected('0')" @click="onClicked" :value="0">
            武将登録/編集
        </div>
        <div :class="'tab ' + selected('1')" @click="onClicked" :value="1">
            本丸防御陣形
        </div>
    </div>

    <BusyoEditor v-if="page === '0'" />

    <FormationEditor v-if="page === '1'" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BusyoEditor from './renderer/BusyoEditor.vue';
import FormationEditor from './renderer/FormationEditor.vue';
import { useBusyoStore } from './store/busyoStore';
const page = ref("0");
const busyoStore = useBusyoStore();

onMounted(async () => {
    await busyoStore.loadBusyos();
});

function onClicked(e: PointerEvent) {
    const div:HTMLDivElement = e.currentTarget as HTMLDivElement;
    page.value = div.getAttribute("value");
}

const selected = (val:string) => {
    return (page.value === val) ? "true" : "false";
};

</script>


<style scoped>
.tabs {
    display: flex;
    margin-bottom: 16px;
}

.true {
    background-color: lightgray;
}

.tab {
    padding: 8px 16px;
    cursor: pointer;
    margin-right: 8px;
}

.tab:hover {
    background-color: #e0e0e0;
}

.tab h2 {
    margin: 0;
    font-size: 16px;
}
.tab[selected] {
    background-color: #fff;
    border-bottom: 2px solid #fff;
    font-weight: bold;
}
</style>