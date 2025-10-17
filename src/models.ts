import { Akazonae, SoldierCategory } from "./constants";
import type { BrigadeEffect, Busyo, Unit, ParameterMatrix } from "./types.d.ts";

export class Brigade {
    units: Unit[] = [ null, null, null, null ];
    
    belongs(busyo: Busyo): boolean {
        return this.units.some(u => u.busyo.id === busyo.id);
    }

    putUnit(unitIndex: number, busyo: Busyo, soldierType: string) {
        this.units[unitIndex] = { busyo, soldierType };
    }

    getParameterMatrix() {
        const matrix: ParameterMatrix = {
            lancer: 0,
            cavalry: 0,
            archer: 0,
            weapon: 0
        };
        this.units.filter( u => u != null ).forEach(unit => {
            const category: keyof ParameterMatrix = SoldierFactory.getCategory(unit.soldierType);
            matrix[category] += unit.busyo.defense + SoldierFactory.getDifference(unit.soldierType) * unit.busyo.forceSize;
        });
        return matrix;
    }
}

export class SkillArgs {
    numberOfUnits: number;
    brigades: Brigade[];

    BrigadeEffects: BrigadeEffect[];

    getBrigadeIndex(busyo: Busyo): number {
        return this.brigades.findIndex(brigade => brigade.belongs(busyo));
    }
}

export class SoldierFactory {

    static akazonae = new Akazonae();

    static get(type: string) {
        switch(type) {
            case "赤備え":
                return SoldierFactory.akazonae;
            default:
                throw new Error(`Unknown soldier type: ${type}`);
        }
    }

    static getDifference(type: string) {
        const soldier = SoldierFactory.get(type);
        return soldier.defense;
    }

    static getCategory(soldierType: string): keyof ParameterMatrix {
        switch(soldierType) {
            case "赤備え":
                return SoldierCategory.Cavalry;
            default:
                throw new Error(`Unknown soldier type: ${soldierType}`);
        }
    }
}