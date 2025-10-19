import { RankBonus, Role } from "./constants";
import { Skill } from "./skilles";
import type { AdditionalProbability, Unit } from "./types.d.ts";

class PreEffect {
    additionalCost: number;
    additionalProbability: AdditionalProbability;
    additionalTakuetsuProbability: AdditionalProbability;
    reduceCost: number;
    constructor() {
        this.additionalCost = 0;
        this.additionalProbability = { all: 0, princess: 0 };
        this.additionalTakuetsuProbability = { all: 0, princess: 0 };
        this.reduceCost = 0;
    }
}

export class Busyo {
    id: string;
    name: string;
    cost: number;
    role: Role;
    forceSize: number;
    rank: number;
    attack: number;
    defense: number;
    strategy: number;
    skills: Skill[] = new Array(4).fill(null);

    constructor() {
        this.id = crypto.randomUUID();
    }

    getFirstSkill(): Skill | null {
        return this.skills[0] ?? null;
    }
}

export class Brigade {
    units: Unit[] = [ null, null, null, null ];
    
    belongs(busyo: Busyo): boolean {
        if(!busyo) return false;
        return this.units.some(u => u && u.busyo.id === busyo.id);
    }

    putUnit(unitIndex: number, busyo: Busyo, soldierType: string) {
        this.units[unitIndex] = { busyo, soldierType };
    }

    getUnitCount() {
        return this.units.filter( u => u != null && u.busyo && u.soldierType ).length;
    }

    getCost(): number {
        return this.units.reduce( (sum, u) => {
            if(u == null || u.busyo == null) return sum;
            return sum + u.busyo.cost;
        }, 0);
    }

    getTotalRank(): number {
        return this.units.reduce( (sum, u) => {
            if(u == null || u.busyo == null) return sum;
            return sum + u.busyo.rank;
        }, 0);
    }

    getRankBonus(): number {
        const rank = this.getTotalRank();
        console.log("rank: ", rank);
        return rank in RankBonus ? RankBonus[rank] : 0;
    }

    // 兵法ボーナス
    getStrategyBonus(): number {
        const strategies = this.units.map( u => u?.busyo?.strategy ?? 0 );
        const maxStrategy = Math.max(...strategies);
        const totalStrategy = strategies.reduce( (sum, val) => sum + val, 0 );
        const otherStrategy = totalStrategy - maxStrategy;
        return (maxStrategy + otherStrategy / 6 )/ 100 / 100;
    }
}

export class SkillArgs {
    numberOfUnits: number;
    formationPreEffect: PreEffect = new PreEffect();
    brigadePreEffects: PreEffect[] = [...Array(6)].map(() => new PreEffect());
    brigades: Brigade[];

    // 旅団単位
    lineNumber: number;
    rankBonus: number;
    strategyBonus: number;

    // スキル単位
    isImitating: boolean;
    totalAdditionalProbability: number;

    results: ParameterMatrix[];

    constructor() {
        this.numberOfUnits = 0;
        this.brigades = [];
        this.lineNumber = 0;
        this.isImitating = false;
        this.totalAdditionalProbability = 0;
        this.results = [ new ParameterMatrix(), new ParameterMatrix(), new ParameterMatrix(), new ParameterMatrix(), ];
    }

    init(): void {
        this.isImitating = false;
        this.totalAdditionalProbability = 0;
        this.results = [ new ParameterMatrix(), new ParameterMatrix(), new ParameterMatrix(), new ParameterMatrix(), ];
    }

    getBrigadeIndex(busyo: Busyo): number {
        const index = this.brigades.findIndex(brigade => brigade.belongs(busyo));
        if (index === -1) {
            throw new Error(`Busyo ${busyo.name} is not found in any brigade.`);
        }
        return index;
    }

    getBrigate(busyo: Busyo): Brigade | null {
        const index = this.getBrigadeIndex(busyo);
        return index >= 0 ? this.brigades[index] : null;
    }

    getReader(busyo: Busyo): Busyo | null {
        const reader = this.getBrigate(busyo).units[0].busyo;
        return reader.id === busyo.id ? null : reader;
    }

    putResult(brigadeIndex: number, matrix: ParameterMatrix) : void {
        this.results[brigadeIndex] = this.results[brigadeIndex].add(matrix);
    }

    getParameterMatrix() : ParameterMatrix {
        const matrix = new ParameterMatrix();
        
        for (const result of this.results) {
            matrix.lancer += result.lancer;
            matrix.cavalry += result.cavalry;
            matrix.archer += result.archer;
            matrix.weapon += result.weapon;
        }
        return matrix;
    }

    getTotalCostReduction(): number {
        let totalReduction = 0;
        console.log("b", this.brigadePreEffects);
        
        for (const brigade of this.brigadePreEffects) {
            totalReduction += brigade.reduceCost;
        }
        return totalReduction;
    }
}

export class ParameterMatrix {
    lancer: number;
    cavalry: number;
    archer: number;
    weapon: number;

    constructor() {
        this.lancer = 0;
        this.cavalry = 0;
        this.archer = 0;
        this.weapon = 0;
    }

    setAll(value: number): void {
        this.lancer = value;
        this.cavalry = value;
        this.archer = value;
        this.weapon = value;
    }

    add(other: ParameterMatrix): ParameterMatrix {
        const m = new ParameterMatrix();
        m.lancer = this.lancer + other.lancer;
        m.cavalry = this.cavalry + other.cavalry;
        m.archer = this.archer + other.archer;
        m.weapon = this.weapon + other.weapon;
        return m;
    }

    multiple(other : ParameterMatrix): ParameterMatrix {
        const m = new ParameterMatrix();
        m.lancer = this.lancer * other.lancer;
        m.cavalry = this.cavalry * other.cavalry;
        m.archer = this.archer * other.archer;
        m.weapon = this.weapon * other.weapon;
        return m;
    }
}