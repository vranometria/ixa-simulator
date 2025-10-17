import { SoldierCategory } from "./constants";

export interface Busyo {
    id: string;
    name: string;
    cost: number;
    forceSize: number;
    attack: number;
    defense: number;
    strategy: number;
    skills: Skill[4];
}

export interface Skill {
    busyo: Busyo;
    name: string;
    ratio: number;
    effect: number;
    culcEffect(args: SkillArgs): void;
}

export interface BrigadeEffect {
    cost: number;  
    all: number;
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