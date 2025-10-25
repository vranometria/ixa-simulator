import { SoldierCategory } from "./constants";
import { Busyo } from "./models";

export interface BusyoInfo {
    id: string;
    name: string;
    cost: string | null;
    role: string;
    forceSize: number;
    rank: string;
    attack: number;
    defense: number;
    strategy: number;
    skillNames: string[];
}

export interface Unit {
    busyo: Busyo;
    soldierType: string;
}

export interface Soldier {
    name: string;
    category: SoldierCategory;
    attack: number;
    defense: number;
    speed: number;
    distraction: number;
}

export interface AdditionalProbability {
    all: number;
    princess: number;
}

export declare global {
   interface Window {
     electronApi: {
       saveBusyo: (busyos: BusyoInfo[]) => Promise<void>;
       loadBusyo: () => Promise<Busyo[]>;
     };
   }
 }