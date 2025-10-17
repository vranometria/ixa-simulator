import type { Soldier } from "./types";

export enum SoldierCategory {
    Lancer = "lancer",
    Cavalry = "cavalry",
    Archer = "archer",
    Weapon = "weapon",
}

export class Akazonae implements Soldier {
    name = "赤備え";
    category = SoldierCategory.Cavalry;
    attack = 100;
    defense = 100;
}