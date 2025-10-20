<template>
    <label for="text" class="item">Name: <input id="text" v-model="busyoName" :class="errors['name']" /></label>
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
            <option v-for="(value, key) in Ranks" :key="key" :value="key">{{ value }}</option>
        </select></label>
    <label for="attack" class="item">攻撃力: <input id="attack" type="number" v-model="attack" :class="errors['attack']" /></label>
    <label for="defense" class="item">防御力: <input id="defense" type="number" v-model="defense" :class="errors['defense']" /></label>
    <label for="strategy" class="item">兵法: <input id="strategy" type="number" v-model="strategy" :class="errors['strategy']" /></label>
    <label for="forceSize" class="item">指揮兵数: <input id="forceSize" type="number" v-model="forceSize" :class="errors['forceSize']" /></label>
    <label for="role" class="item">役割: <select v-model="role" :class="errors['role']">
            <option v-for="(value, key) in Role" :value="value">{{ value }}</option>
        </select></label>
    <label for="skill1" class="item">スキル1: <select v-model="skill1" :class="errors['skill1']">
            <option v-for="skill in skillNames" :key="skill" :value="skill">{{ skill }}</option>
        </select></label>
    <label for="skill2" class="item">スキル2: <select v-model="skill2" :class="errors['skill2']">
            <option v-for="skill in skillNames" :key="skill" :value="skill">{{ skill }}</option>
        </select></label>
    <label for="skill3" class="item">スキル3: <select v-model="skill3" :class="errors['skill3']">
            <option v-for="skill in skillNames" :key="skill" :value="skill">{{ skill }}</option>
        </select></label>
    <label for="skill4" class="item">スキル4: <select v-model="skill4" :class="errors['skill4']">
            <option v-for="skill in skillNames" :key="skill" :value="skill">{{ skill }}</option>
        </select></label>

    <button class="item" @click="save">保存</button>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useBusyoStore } from '../store/busyoStore';
import { Ranks, Role } from '@/constants';
import { Busyo } from '@/models';
import { createSkill, getSkillNames } from '@/skilles';
const busyoName = ref('');
const busyoCost = ref(1);
const skillNames = ["", ...getSkillNames()];
const attack = ref(0);
const defense = ref(0);
const strategy = ref(0);
const forceSize = ref(0);
const skill1 = ref("");
const skill2 = ref("");
const skill3 = ref("");
const skill4 = ref("");
const rank = ref(0);
const role = ref(Role.General);
const busyoStore = useBusyoStore();
const errors = ref<{ [key: string]: string }>({});

const clear = () => {
    busyoName.value = "";
    busyoCost.value = 1;
    attack.value = 0;
    defense.value = 0;
    strategy.value = 0;
    forceSize.value = 0;
    rank.value = 0;
    skill1.value = "";
    skill2.value = "";
    skill3.value = "";
    skill4.value = "";
};

const validate = (): boolean => {
    errors.value = {};

    if (!busyoName.value) {
        errors.value["name"] = "error";
    }

    if(skill1.value === "") {
        errors.value["skill1"] = "error";
    }

    return Object.keys(errors.value).length === 0;
};

const save = () => {
    if (!validate()) {
        return;
    }

    const busyo = new Busyo();
    busyo.name = busyoName.value;
    busyo.cost = Number(busyoCost.value);
    busyo.rank = Number(rank.value);
    busyo.role = role.value;
    busyo.attack = attack.value;
    busyo.defense = defense.value;
    busyo.strategy = strategy.value;
    busyo.forceSize = forceSize.value;
    busyo.skills = [skill1.value, skill2.value, skill3.value, skill4.value].filter(s => s).map(s => createSkill(s, busyo));
    busyoStore.addBusyo(busyo);
    clear();
}
</script>

<style scoped>
.item {
    display: block;
    margin-bottom: 8px;
}

.error {
    background-color: red;
}
</style>