import type { Soldier } from "./types";

export enum SkillRarity {
    SSS = "SSS",
    SS = "SS",
    S = "S",
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E"
}

export enum Role {
    Overload = "覇",
    General = "将",
    Princess = "姫",
    Shinobi = "忍",
    Chajin = "文",
    Swordman = "剣",
    Doctor = "医",
}

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

export const SoldierTypeNames = [ "武士", "赤備え", "弓騎馬", "鉄砲足軽", "騎馬鉄砲", "炮烙火矢", "穴太衆", "雑衆衆" ] as const;
