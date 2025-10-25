import { defineStore } from 'pinia'
import { Busyo, toBusyoInfo } from '../models';
import type { BusyoInfo } from '../types';
import { toRaw } from 'vue';

export const useBusyoStore = defineStore('busyo', {
    state: () => ({
        editting: {
            id: '',
            name: '',
            cost: "",
            rank: "",
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
        RawBusyoInfos: (state) => state.busyos.map(b => toBusyoInfo(toRaw(b))),
    },
    actions: {
        clearEditing() {
            this.editting = {
                id: '',
                name: '',
                cost: "",
                rank: "",
                forceSize: 0,
                attack: 0,
                defense: 0,
                speed: 0,
                strategy: 0,
                role: '将',
                skillNames: [],
            } as BusyoInfo;
        },
        editBusyo(id: string) {
            const busyo: Busyo | undefined = this.busyos.find((b: Busyo) => b.id === id);
            if (busyo) {
                const b = toBusyoInfo(busyo);
                this.editting.id = b.id;
                this.editting.name = b.name;
                this.editting.cost = b.cost;
                this.editting.rank = b.rank;
                this.editting.forceSize = b.forceSize;
                this.editting.attack = b.attack;
                this.editting.defense = b.defense;
                this.editting.strategy = b.strategy;
                this.editting.role = b.role;
                this.editting.skillNames = b.skillNames.slice();
            }
            else{
                this.clearEditing();
            }
        },
        save(){
            const busyo = new Busyo();
            busyo.loadFromBusyoInfo(toRaw(this.editting));
            if(!busyo.id){
                busyo.id = crypto.randomUUID();
            }
            const index = this.busyos.findIndex((b: Busyo) => b.id === this.editting.id);
            if (index >= 0) {
                // update
                this.busyos[index] = busyo;
            } else {
                // create
                this.busyos.push(busyo);
            }

            window.electronApi.saveBusyo(this.RawBusyoInfos);
        },
        deleteBusyo(id: string) {
            this.busyos = this.busyos.filter((b: Busyo) => b.id !== id);
            window.electronApi.saveBusyo(this.RawBusyoInfos);
        },
        getBusyoById(id: string): Busyo | undefined {
            return this.busyos.find((b: Busyo) => b.id === id);
        },
        async loadBusyos() {
            this.busyos = await window.electronApi.loadBusyo();
        }
    },
});