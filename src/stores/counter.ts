import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const layoutStore = defineStore('films', {
  state: () => ({ 
    platform: navigator.userAgent

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