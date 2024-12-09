import { defineStore } from 'pinia'
import { genres, tvGenre } from '@/config/genre'
 
export const useMediaStore = defineStore('films', {
  state: () => ({ 
    genres: genres,
    tvGenre
  }),
  getters: { 
  },
  actions: { 
  },
})