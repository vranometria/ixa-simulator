<template>
    <div class="unit-edit">
        <div>
            {{ rank }}
        </div>
        <img :src="image" alt="Unit Image" @dblclick="onDoubleClicked"/>
        <select class="item" v-model="busyoId" @change="onChanged">
            <option value=""></option>
            <option v-for="t in busyoStore.idAndNames" :key="t.id" :value="t.id">{{ t.name }}</option>
        </select>
        <select class="item" v-model="soldierType" @change="onChanged">
            <option value=""></option>
            <option v-for="type in SoldierType.Names" :key="type" :value="type">{{ type }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBusyoStore } from '@/store/busyoStore';
import { usePageStore, Pages } from '@/store/pageStore';
import { Busyo } from '@/models';
import { Ranks, SoldierType } from '@/constants';

const props = defineProps<{ num: number }>();
const emits = defineEmits<{ (e: "changed", index: number, busyo: Busyo | null, soldierType: string): void }>();

const page = usePageStore();
const busyoId = ref("");
const soldierType = ref("");
const image = ref("./assets/someone.png");
const busyoStore = useBusyoStore();
const rank = ref<string>("");

const onChanged = (event: Event) => {
    let busyo: Busyo | null = null;
    rank.value = "";
    if(busyoId.value){
        busyo = busyoStore.getBusyoById(busyoId.value);
        rank.value = Ranks[busyo.rank];
    }
    emits("changed", props.num, busyo, soldierType.value);
};

const onDoubleClicked = () => {
    if(busyoId.value === "") return;
    busyoStore.editBusyo(busyoId.value);
    page.setCurrentPage(Pages.BusyoEditor);
};
</script>


<style scoped>
.unit-edit {
    width: 110px;
    height: 180px;
    border: 1px solid gray;
    margin: 4px;
    padding: 4px;
    align-items: center;
}

select {
    width: 100%;
}

img {
    width: 100px;
    height: 100px;
}

.item {
    display: block;
}
</style>