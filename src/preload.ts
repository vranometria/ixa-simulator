import { contextBridge, ipcRenderer } from "electron";
import { Busyo } from "./models";

contextBridge.exposeInMainWorld('electronApi', {
    saveBusyo: (busyos: Busyo[]) => ipcRenderer.invoke('save-busyo', busyos),
    loadBusyo: () => ipcRenderer.invoke('load-busyo'),
    // saveFormation: () => ipcRenderer.invoke('save-formation'),
    // loadFormation: () => ipcRenderer.invoke('load-formation'),
});