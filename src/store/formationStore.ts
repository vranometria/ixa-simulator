import { defineStore } from 'pinia'
import { Brigade } from '../models';
import type { Busyo } from '../types.d.ts';

export const useFormationStore = defineStore('formation', {
    state: () => ({
        formations: [ new Brigade(), new Brigade(), new Brigade(), new Brigade(), new Brigade(), new Brigade() ] as Brigade[],
    }),
    getters: {
    },
    actions: {
        putUnit(brigadeIndex: number, unitIndex: number, busyo: Busyo, soldierType: string) {
            this.formations[brigadeIndex].putUnit(unitIndex, busyo, soldierType);
        },
        getParameterMatrix(brigadeIndex: number) {
            return this.formations[brigadeIndex].getParameterMatrix();
        }
    },
});