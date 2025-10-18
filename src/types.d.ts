import { SoldierCategory } from "./constants";
import { Busyo } from "./models";

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

export interface AdditionalProbability {
    all: number;
    princess: number;
}