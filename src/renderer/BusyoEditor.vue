<template>
    <div class="mode-panel">
        {{ mode === 'edit' ? '編集モード: ' + busyoStore.editting.id : '登録モード' }}
        <span v-if="mode === 'edit'">
            <button @click="changeToCreateMode">編集解除</button>
        </span>
    </div>
    <label for="text" class="item">Name: <input id="text" v-model="busyoStore.editting.name"
            :class="errors['name']" /></label>
    <label for="cost" class="item">Cost: <select v-model="busyoStore.editting.cost" :class="errors['cost']">
            <option value="">-- 選択してください --</option>
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
    <label for="rank" class="item">ランク: <select v-model="busyoStore.editting.rank">
            <option value="">-- 選択してください --</option>
            <option v-for="(value, key) in Ranks" :key="key" :value="key">{{ value }}</option>
        </select></label>
    <label for="attack" class="item">攻撃力: <input id="attack" type="number" v-model="busyoStore.editting.attack"
            :class="errors['attack']" /></label>
    <label for="defense" class="item">防御力: <input id="defense" type="number" v-model="busyoStore.editting.defense"
            :class="errors['defense']" /></label>
    <label for="strategy" class="item">兵法: <input id="strategy" type="number" v-model="busyoStore.editting.strategy"
            :class="errors['strategy']" /></label>
    <label for="forceSize" class="item">指揮兵数: <input id="forceSize" type="number"
            v-model="busyoStore.editting.forceSize" :class="errors['forceSize']" /></label>
    <label for="role" class="item">役割: <select v-model="busyoStore.editting.role" :class="errors['role']">
            <option v-for="(value, key) in Role" :value="value">{{ value }}</option>
        </select></label>
    <label for="skill1" class="item">スキル1: <select v-model="busyoStore.editting.skillNames[0]"
            :class="errors['skill1']">
            <option value="">-- 選択してください --</option>
            <option v-for="skill in getSkillNames()" :key="skill" :value="skill">{{ skill }}</option>
        </select></label>
    <label for="skill2" class="item">スキル2: <select v-model="busyoStore.editting.skillNames[1]"
            :class="errors['skill2']">
            <option value="">-- 選択してください --</option>
            <option v-for="skill in getSkillNames()" :key="skill" :value="skill">{{ skill }}</option>
        </select></label>
    <label for="skill3" class="item">スキル3: <select v-model="busyoStore.editting.skillNames[2]"
            :class="errors['skill3']">
            <option value="">-- 選択してください --</option>
            <option v-for="skill in getSkillNames()" :key="skill" :value="skill">{{ skill }}</option>
        </select></label>
    <label for="skill4" class="item">スキル4: <select v-model="busyoStore.editting.skillNames[3]"
            :class="errors['skill4']">
            <option value="">-- 選択してください --</option>
            <option v-for="skill in getSkillNames()" :key="skill" :value="skill">{{ skill }}</option>
        </select></label>

    <button class="item" @click="save">保存</button>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useBusyoStore } from '../store/busyoStore';
import { Ranks, Role } from '@/constants';
import { getSkillNames } from '@/skilles';
const busyoStore = useBusyoStore();
const errors = ref<{ [key: string]: string }>({});
const mode = ref<"new" | "edit">(busyoStore.editting.id ? "edit" : "new");

const validate = (): boolean => {
    errors.value = {};

    if (busyoStore.editting.cost === null || busyoStore.editting.cost === "") {
        errors.value["cost"] = "error";
    }

    if (!busyoStore.editting.name || busyoStore.editting.name.trim() === "") {
        errors.value["name"] = "error";
    }

    if (!busyoStore.editting.rank || busyoStore.editting.rank === "") {
        errors.value["rank"] = "error";
    }

    if (busyoStore.editting.skillNames[0] === "") {
        errors.value["skill1"] = "error";
    }

    return Object.keys(errors.value).length === 0;
};

const save = () => {
    if (!validate()) {
        return;
    }
    busyoStore.save();
    busyoStore.clearEditing();
}

const changeToCreateMode = () => {
    busyoStore.clearEditing();
    mode.value = "new";
};
</script>

<style scoped>
.item {
    display: block;
    margin-bottom: 8px;
}

.error {
    background-color: red;
}

.mode-panel {
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid gray;
    background-color: #f0f0f0;
}
</style>