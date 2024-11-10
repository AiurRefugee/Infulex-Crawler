import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { mediasApi } from "@/APIs/medias.js";  

export const useMediaStore = defineStore('films', {
  state: () => ({ 
    favoriteMovies: [],
    favoriteTVs: [],
    movieLibrary: [],
    tvLibrary: [],
  }),
  getters: {
    // double: (state) => state.count * 2,
    favoriteMoviesIs: (state) => {
        const movies = state.favoriteMovies.map(movie => movie?.id);
        return new Set(movies)
    },
    favoriteTVsIs: (state) => {
        const tvs = state.favoriteTVs.map(tv => tv?.id);
        return new Set(tvs)
    },
    movieLibraryIs: (state) => {
        const movies = state.movieLibrary.map(movie => movie?.id);
        return new Set(movies)
    },
    tvLibraryIs: (state) => {
        const tvs = state.tvLibrary.map(tv => tv?.id);
        return new Set(tvs)
    } 
  },
  actions: {
    addToFavorite(media, type) {
      if (type === 'movie') {
        this.favoriteMovies.push(media)
      } else {
        this.favoriteTVs.push(media)
      }
      mediasApi.addToFavorite(media, type)
    },

    removeFromFavorite(mediaId, type) {
      if (type === 'movie') {
        this.favoriteMovies = this.favoriteMovies.filter(movie => movie.id !== mediaId)
      } else {
        this.favoriteTVs = this.favoriteTVs.filter(tv => tv.id !== mediaId)
      }
      mediasApi.removeFavorite(mediaId, type)
    },

    addToLibrary(media, type) {
      if (type === 'movie') {
        this.movieLibrary.push(media)
      } else {
        this.tvLibrary.push(media)
      }
      mediasApi.addToFavorite(media, type)
    },

    removeFromLibrary(media, type) {
      if (type === 'movie') {
        this.movieLibrary = this.movieLibrary.filter(movie => movie.id !== media.id)
      } else {
        this.tvLibrary = this.tvLibrary.filter(tv => tv.id !== media.id)
      }
      mediasApi.removeFromLibrary(media, type)
    },

    async fetchFavoriteMovieList() {
        const movies = await mediasApi.getFavoriteList('movie');
        this.favoriteMovies = movies;
    },

    async fetchFavoriteTVList() {
        const tvs = await mediasApi.getFavoriteList('tv');
        this.favoriteTVs = tvs;
    },

    async initMediaStore() {
        this.fetchFavoriteMovieList();
        this.fetchFavoriteTVList();
    }
  },
})