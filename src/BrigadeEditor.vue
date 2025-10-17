<template>
    <div class="brigade">
        <div class="unit" v-for="i in [1, 2, 3, 4]">
            <UnitEdit @changed="changed" :num="i" />
        </div>
        <ParameterView :param="formationStore.getParameterMatrix(props.num - 1)" />
    </div>
</template>

<script setup lang="ts">
import { Busyo } from './models';
import ParameterView from './ParameterView.vue';
import { useFormationStore } from './store/formationStore';
import UnitEdit from './UnitEdit.vue';

const formationStore = useFormationStore();

const props = defineProps<{
    num: number;
}>();

const changed = (unitNum: number, busyo: Busyo | undefined, soldierType: string) => {
    formationStore.putUnit(props.num - 1, unitNum - 1, busyo, soldierType);
};
</script>

<style scoped>
.brigade {
    border: 1px solid black;
    display: flex;
    padding: 8px;
    margin: 8px;
}
</style>