import { defineStore } from 'pinia'
import type { Busyo } from '../types.d.ts';

export const useBusyoStore = defineStore('busyo', {
    state: () => ({
        busyos: [] as Busyo[],
    }),
    getters: {
        busyoNames: (state) => state.busyos.map(b => b.name),
        count : (state) => state.busyos.length,
        idAndNames : (state) => state.busyos.map(b => ({id: b.id, name: b.name})),
    },
    actions: {
        addBusyo(busyo : Busyo) {
            this.busyos.push(busyo);
        },
    },
});