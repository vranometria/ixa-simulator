import { defineStore } from "pinia";

export enum Pages {
    BusyoEditor = 1,
    FormationEditor = 2
};

export const usePageStore = defineStore('page', {
  state: () => ({
    currentPage: Pages.BusyoEditor,
  }),
  actions: {
    setCurrentPage(page: Pages) {
      this.currentPage = page;
    },
  },
});