<template>
    <label for="text" class="item">Name: <input id="text" v-model="busyoName" /></label>
    <label for="cost" class="item">Cost: <select v-model="busyoCost">
            <option value="0">0</option>
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
            <option value="3.5">3.5</option>
            <option value="4">4</option>
            <option value="4.5">4.5</option>
            <option value="5">5</option>
            <option value="5.5">5.5</option>
            <option value="6">6</option>
            <option value="6.5">6.5</option>
            <option value="7">7</option>
            <option value="7.5">7.5</option>
            <option value="8">8</option>
            <option value="8.5">8.5</option>
        </select></label>
    <label for="rank" class="item">ランク: <select v-model="rank">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">限界突破</option>
            <option value="7">極限突破</option>
            <option value="8">天限突破</option>
        </select></label>
    <label for="attack" class="item">攻撃力: <input id="attack" type="number" v-model="attack" /></label>
    <label for="defense" class="item">防御力: <input id="defense" type="number" v-model="defense" /></label>
    <label for="strategy" class="item">兵法: <input id="strategy" type="number" v-model="strategy" /></label>
    <label for="forceSize" class="item">指揮兵数: <input id="forceSize" type="number" v-model="forceSize" /></label>
    <label for="skill1" class="item">スキル1: <select>
            <option v-for="skill in skillNames" :key="skill" :value="skill">{{ skill }}</option>
        </select></label>
    <label for="skill2" class="item">スキル2: <select>
            <option v-for="skill in skillNames" :key="skill" :value="skill">{{ skill }}</option>
        </select></label>
    <label for="skill3" class="item">スキル3: <select>
            <option v-for="skill in skillNames" :key="skill" :value="skill">{{ skill }}</option>
        </select></label>
    <label for="skill4" class="item">スキル4: <select>
            <option v-for="skill in skillNames" :key="skill" :value="skill">{{ skill }}</option>
        </select></label>

    <button class="item" @click="save">保存</button>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { SkillCreator, SkillNames } from './skilles';
import { Busyo } from './types';
import { useBusyoStore } from './store/busyoStore';
const busyoName = ref('');
const busyoCost = ref(1);
const skillNames = ["", ...SkillNames];
const attack = ref(0);
const defense = ref(0);
const strategy = ref(0);
const forceSize = ref(0);
const skill1 = ref("");
const skill2 = ref("");
const skill3 = ref("");
const skill4 = ref("");
const rank = ref(0);
const busyoStore = useBusyoStore();

const clear = () => {
    busyoName.value = "";
    busyoCost.value = 1;
    attack.value = 0;
    defense.value = 0;
    strategy.value = 0;
    forceSize.value = 0;
    skill1.value = "";
    skill2.value = "";
    skill3.value = "";
    skill4.value = "";
};

const save = () => {
    const busyo: Busyo = {
        id: crypto.randomUUID(),
        name: busyoName.value,
        cost: busyoCost.value,
        forceSize: forceSize.value,
        attack: attack.value,
        defense: defense.value,
        strategy: strategy.value,
        skills: [],
    };
    busyo.skills = [skill1.value, skill2.value, skill3.value, skill4.value].map(s => s).filter(s => SkillCreator.create(s, busyo));
    busyoStore.addBusyo(busyo);
    clear();
}
</script>

<style scoped>
.item {
    display: block;
    margin-bottom: 8px;
}
</style>