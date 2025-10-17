import type { BrigadeEffect, Busyo, Unit } from "./types.d.ts";

export class Brigade {
    units: Unit[] = [ null, null, null, null ];
    
    belongs(busyo: Busyo): boolean {
        return this.units.some(u => u.busyo.id === busyo.id);
    }

    putUnit(unitIndex: number, busyo: Busyo, soldierType: string) {
        this.units[unitIndex] = { busyo, soldierType };
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