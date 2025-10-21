import { defineStore } from 'pinia'
import { Busyo, toBusyoInfo } from '../models';
import type { BusyoInfo } from '../types';
import { toRaw } from 'vue';

export const useBusyoStore = defineStore('busyo', {
    state: () => ({
        editting: {
            id: '',
            name: '',
            cost: 0,
            rank: 1,
            forceSize: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            strategy: 0,
            role: '将',
            skillNames: [],
        } as BusyoInfo,
        busyos: [] as Busyo[],
    }),
    getters: {
        busyoNames: (state) => state.busyos.map(b => b.name),
        count : (state) => state.busyos.length,
        idAndNames : (state) => state.busyos.map(b => ({id: b.id, name: b.name})),
    },
    actions: {
        clearEditing() {
            this.editting = {
                id: '',
                name: '',
                cost: 0,
                rank: 1,
                forceSize: 0,
                attack: 0,
                defense: 0,
                speed: 0,
                strategy: 0,
                role: '将',
                skillNames: [],
            } as BusyoInfo;
        },
        addBusyo() {
            const busyo = new Busyo();
            busyo.loadFromBusyoInfo(this.editting);
            this.busyos.push(busyo);
        },
        save(){
            const array = this.busyos.map((b:Busyo) => toBusyoInfo(b));
            window.electronApi.saveBusyo(array);
            this.clearEditing();
        },
        getBusyoById(id: string): Busyo | undefined {
            return this.busyos.find((b: Busyo) => b.id === id);
        },
        async loadBusyos() {
            this.busyos = await window.electronApi.loadBusyo();
        }
    },
});