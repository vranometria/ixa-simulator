<template>
    <div class="formation-editor">
        <section>
            <div v-for="num in [1, 2, 3, 4, 5, 6]">
                <BrigadeEditor @changed="change" :num="num" />
            </div>
        </section>
        <section class="right-pane">
            <div>
                総コスト: {{ store.AllCost }}
            </div>

        </section>
    </div>
</template>

<script setup lang="ts">
import BrigadeEditor from './BrigadeEditor.vue';
import { useFormationStore } from './store/formationStore';
const store = useFormationStore();
const change = () => {
    console.log('change');   
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
</style>