import { readonly } from "vue";
import type { Soldier as ISoldier } from "./types";

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

class Test implements ISoldier {
    name = "Test";
    category = SoldierCategory.Cavalry;
    attack = 100;
    defense = 100;
    distraction = 100;
    speed = 100;
}

class 赤備え implements ISoldier {
    name = "赤備え";
    category = SoldierCategory.Cavalry;
    attack = 26;
    defense = 26;
    distraction = 3;
    speed = 22;
}

class 母衣衆 implements ISoldier {
    name = "母衣衆";
    category = SoldierCategory.Cavalry;
    attack = 27;
    defense = 27;
    speed = 23;
    distraction = 7;
}

class 武士 implements ISoldier {
    name = "武士";
    category = SoldierCategory.Lancer;
    attack = 26;
    defense = 27;
    speed = 17;
    distraction = 5;
}

class 鉄砲足軽 implements ISoldier {
    name = "鉄砲足軽";
    category = SoldierCategory.Lancer;
    attack = 30;
    defense = 32;
    speed = 17;
    distraction = 10;
}

class 弓騎馬 implements ISoldier {
    name = "弓騎馬";
    category = SoldierCategory.Archer;
    attack = 27;
    defense = 26;
    speed = 21;
    distraction = 3;
}

class 騎馬鉄砲 implements ISoldier {
    name = "騎馬鉄砲";
    category = SoldierCategory.Cavalry;
    attack = 31;
    defense = 31;
    speed = 20;
    distraction = 10;
}

class 炮烙火矢 implements ISoldier {
    name = "炮烙火矢";
    category = SoldierCategory.Archer;
    attack = 32;
    defense = 30;
    speed = 16;
    distraction = 12;
}

class 穴太衆 implements ISoldier {
    name = "穴太衆";
    category = SoldierCategory.Weapon;
    attack = 25;
    defense = 25;
    speed = 15;
    distraction = 15;
}

class 雑衆衆 implements ISoldier {
    name = "雑衆衆";
    category = SoldierCategory.Weapon;
    attack = 32;
    defense = 32;
    speed = 19;
    distraction = 17;
}

class Soldiers {
    readonly list: ISoldier[] = [
        new Test(),
        new 赤備え(),
        new 母衣衆(),
        new 武士(),
        new 鉄砲足軽(),
        new 弓騎馬(),
        new 騎馬鉄砲(),
        new 炮烙火矢(),
        new 穴太衆(),
        new 雑衆衆(),
    ];

    readonly Names = this.list.map( s => s.name );

    readonly map: Record<string, ISoldier> = this.list.reduce( (acc, s) => {
        acc[s.name] = s;
        return acc;
    }, {} as Record<string, ISoldier> );
}

const soldiersInstance = new Soldiers();
export const SoldierType = soldiersInstance;

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