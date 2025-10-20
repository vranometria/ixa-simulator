import { defineStore } from 'pinia'
import { Busyo } from '../models';

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
            const array = this.busyos.map((b:Busyo) => b.toBusyoInfo());
            window.electronApi.saveBusyo(array);
        },
        getBusyoById(id: string): Busyo | undefined {
            return this.busyos.find((b: Busyo) => b.id === id);
        },
        async loadBusyos() {
            this.busyos = await window.electronApi.loadBusyo();
        }
    },
});