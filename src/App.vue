<template>
    <div class="tabs">
        <div :class="'tab ' + selected('1')" @click="onClicked" :value="1">
            武将登録/編集
        </div>
        <div :class="'tab ' + selected('2')" @click="onClicked" :value="2">
            本丸防御陣形
        </div>
    </div>

    <BusyoEditor v-if="page.currentPage === 1" />

    <FormationEditor v-if="page.currentPage === 2" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BusyoEditor from './renderer/BusyoEditor.vue';
import FormationEditor from './renderer/FormationEditor.vue';
import { useBusyoStore } from './store/busyoStore';
import { usePageStore } from './store/pageStore';
const busyoStore = useBusyoStore();
const page = usePageStore();

onMounted(async () => {
    await busyoStore.loadBusyos();
});

function onClicked(e: PointerEvent) {
    const div:HTMLDivElement = e.currentTarget as HTMLDivElement;
    page.setCurrentPage(Number(div.getAttribute("value")));
}

const selected = (val:string) => {
    return (page.currentPage === Number(val)) ? "true" : "false";
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