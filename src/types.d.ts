import { SoldierCategory, SkillRarity } from "./constants";

export interface Skill {
    busyo: Busyo;
    name: string;
    rarity: SkillRarity;
    imitable: boolean = true; // 模倣可能かどうか
    ratio: number;
    effect: number;
    preEffect?(args: SkillArgs): void;
    culcEffect(args: SkillArgs): void;
}

export interface BrigadeEffect {
    cost: number;  
    all: number;

    addProbabilityOnlyPrincess: number; // 姫のみ確率追加
}

export interface Unit {
    busyo: Busyo;
    soldierType: string;
}

export interface Soldier {
    name: string;
    category: SoldierCategory;
    attack: number;
    defense: number;
}

export interface ParameterMatrix {
    lancer: number;
    cavalry: number;
    archer: number;
    weapon: number;
}