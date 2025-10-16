import { BrigadeEffect, Busyo } from "./types";

class Brigade {
    busyos: Busyo[];

    belongs(busyo: Busyo): boolean {
        return this.busyos.some(b => b.id === busyo.id);
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