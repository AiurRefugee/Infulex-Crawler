import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFilmStore = defineStore('films', {
  state: () => ({ 
    dailyRec: [],
    tags: [],
    films: [],
    topTwenty: [],
    filmDetail: {}

  }),
  getters: {
    // double: (state) => state.count * 2,
  },
  actions: {
    // increment() {
    //   this.count++
    // },
  },
})