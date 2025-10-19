<template>
    <div class="brigade">
        <div class="unit" v-for="i in [1, 2, 3, 4]">
            <UnitEdit @changed="changed" :num="i" />
        </div>

        <div class="addition">
            <h4>ボーナス</h4>
            <table>
                <tr>
                    <th>ランク</th>
                    <td> +{{ (rankBonus * 100).toFixed(1) }}% </td>
                </tr>
                <tr>
                    <th>兵法</th>
                    <td> +{{ (strategyBonus * 100).toFixed(1) }}% </td>
                </tr>
            </table>
        </div>
        <ParameterView :param="formationStore.getParameterMatrix(props.num - 1)" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Busyo } from './models';
import ParameterView from './ParameterView.vue';
import { useFormationStore } from './store/formationStore';
import UnitEdit from './UnitEdit.vue';

const emits = defineEmits<{
    (e: 'changed'): void;
}>();
const props = defineProps<{
    num: number;
}>();
const formationStore = useFormationStore();
const rankBonus = ref(0);
const strategyBonus = ref(0);

const changed = (unitNum: number, busyo: Busyo | null, soldierType: string) => {
    if (!busyo || !soldierType) {
        formationStore.removeUnit(props.num - 1, unitNum - 1);
        return;
    }
    formationStore.putUnit(props.num - 1, unitNum - 1, busyo, soldierType);
    rankBonus.value = formationStore.formations[props.num - 1].getRankBonus();
    strategyBonus.value = formationStore.formations[props.num - 1].getStrategyBonus();
    emits('changed');
};
</script>

<style scoped>
.brigade {
    border: 1px solid black;
    display: flex;
    padding: 8px;
    margin: 8px;
    width: 1000px;
}

.addition {
    margin-left: 16px;
    width: 200px;
}
</style>