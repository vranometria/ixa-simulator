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

/** スキル発動確率上昇値一覧 */
export const RankBonus: Record<number, number> = {
    1: 0.001,
    2: 0.002,
    3: 0.003,
    4: 0.0045,
    5: 0.006,
    6: 0.0075,
    7: 0.009,
    8: 0.011,
    9: 0.013,
    10: 0.015,
    11: 0.017,
    12: 0.0195,
    13: 0.022,
    14: 0.0245,
    15: 0.027,
    16: 0.03,
    17: 0.033,
    18: 0.036,
    19: 0.039,
    20: 0.043,
    21: 0.047,
    22: 0.051,
    23: 0.055,
    24: 0.06,
    25: 0.0625,
    26: 0.065,
    27: 0.0675,
    28: 0.09,
    29: 0.095,
    30: 0.10,
    31: 0.11,
    32: 0.12,
};

export const Ranks: Record<number, string> = {
    0: "★0",
    1: "★1",
    2: "★2",
    3: "★3",
    4: "★4",
    5: "★5",
    6: "限界突破",
    7: "極限突破",
    8: "天限突破",
};