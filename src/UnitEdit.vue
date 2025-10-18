<template>
    <div class="unit-edit">
        <div>
            {{ rank }}
        </div>
        <img :src="image" alt="Unit Image" />
        <select class="item" v-model="busyoId" @change="onChanged">
            <option value=""></option>
            <option v-for="t in busyoStore.idAndNames" :key="t.id" :value="t.id">{{ t.name }}</option>
        </select>
        <select class="item" v-model="soldierType" @change="onChanged">
            <option value=""></option>
            <option v-for="type in soldierTypeNames" :key="type" :value="type">{{ type }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBusyoStore } from './store/busyoStore';
import { Busyo } from './models';
import { Ranks, SoldierTypeNames } from './constants';

const props = defineProps<{ num: number }>();
const emits = defineEmits<{ (e: "changed", index: number, busyo: Busyo | null, soldierType: string): void }>();

const busyoId = ref("");
const soldierType = ref("");
const image = ref("./assets/someone.png");
const soldierTypeNames = ["", ...SoldierTypeNames];
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