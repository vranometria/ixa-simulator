<template>
    <div class="formation-editor">
        <section>
            <div v-for="num in [1, 2, 3, 4, 5, 6]">
                <BrigadeEditor @changed="onChange" :num="num" />
            </div>
        </section>
        <section class="right-pane">
            <div :class="isCostOver()">
                総コスト: {{ store.AllCost - costReduction }} ({{ store.AllCost }}) / 69
            </div>
            <div>
                コスト削減: {{ costReduction }}
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BrigadeEditor from './BrigadeEditor.vue';
import { useFormationStore } from './store/formationStore';
const store = useFormationStore();
const costReduction = ref(0);

const onChange = () => {
    const skillArgs = store.PreEffect;
    costReduction.value = skillArgs.getTotalCostReduction();
};

const isCostOver = () => {
    return store.AllCost - costReduction.value > 69 ? 'over-cost' : '';
};
</script>

<style scoped>
.formation-editor {
    display: flex;
    gap: 16px;
    width: 2000px;
}

.right-pane {
    position: sticky;
    top: 16px;
    border: 1px solid #ccc;
    padding: 8px;
    display: block;
    width: 300px;
    height: 200px;
}

.over-cost {
    color: red;
    font-weight: bold;
}
</style>