import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { genres, tvGenre } from '@/config/genre'
import { tmdbImgPrefix } from "@/config/tmdbConfig.js";

import { mediasApi } from "@/apis/medias.js";
const defaultArrays = ["", "", "", "", "", "", "", "", "", ""]
export const useMediaStore = defineStore('films', {
  state: () => ({
    favoriteMovies: [""],
    favoriteTVs: [""],
    movieLibrary: [""],
    tvLibrary: [""],
    genres: genres,
    tvGenre
  }),
  getters: {
    // double: (state) => state.count * 2,
    favoriteMoviesIs: (state) => { 
      if (state.movieLibrary && state.movieLibrary?.length) {
        return new Set(state.movieLibrary.map(movie => movie?.id))
      } 
      return new Set()
    },
    favoriteTVsIs: (state) => {
      if (state.favoriteTVs && state.favoriteTVs?.length) {
        return new Set(state.favoriteTVs.map(tv => tv?.id))
      } 
      return new Set()
    },
    movieLibraryIs: (state) => {
      if (state.movieLibrary && state.movieLibrary?.length) {
        const movies = state.movieLibrary?.map(movie => movie?.id);
        return new Set(movies)
      } 
      return new Set()
    },
    tvLibraryIs: (state) => {
      if (state.tvLibrary && state.tvLibrary?.length) {
        const tvs = state.tvLibrary?.map(tv => tv?.id);
        return new Set(tvs)
      } 
      return new Set()
      
    }
  },
  actions: {
    addToFavorite(media, type) {

      mediasApi.addToFavorite(media, type).then(res => {
        if (type === 'movie') {
          this.favoriteMovies.push(media)
        } else {
          this.favoriteTVs.push(media)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    removeFromFavorite(mediaId, type) {

      mediasApi.removeFavorite(mediaId, type).then(res => {
        if (type === 'movie') {
          this.favoriteMovies = this.favoriteMovies.filter(movie => movie.id !== mediaId)
        } else {
          this.favoriteTVs = this.favoriteTVs.filter(tv => tv.id !== mediaId)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    addToLibrary(media, type) {
      mediasApi.addToLibrary(media, type).then(res => {
        console.log(res)
        if (type === 'movie') {
          this.movieLibrary.push(media)
          this.updateGenre()
        } else {
          this.tvLibrary.push(media)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    removeFromLibrary(mediaId, type) {

      mediasApi.removeFromLibrary(mediaId, type).then(res => {
        console.log(res)
        if (type === 'movie') {
          this.movieLibrary = this.movieLibrary.filter(movie => movie.id !== mediaId)
          this.updateGenre()
        } else {
          this.tvLibrary = this.tvLibrary.filter(tv => tv.id !== mediaId)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    async fetchFavoriteMovieList() {
      mediasApi.getFavoriteList('movie').then(res => {
        this.favoriteMovies = res ?.length ? res : [""];
      }).catch(err => {
        console.log('fetchFavoriteMovieList', err)
      })
     },

    async fetchFavoriteTVList() {
      mediasApi.getFavoriteList('tv').then(tvs => {
        this.favoriteTVs = tvs ?.length ? tvs : [""];
      }).catch(err => {
        console.log('fetchFavoriteTVList', err)
      })
      
    },

    async fetchLibraryMovieList() {
      mediasApi.getLibraryList('movie').then(res => {
        this.movieLibrary = res?.length ? res : [""];
      }).catch(err => {
        console.log('fetchLibraryMovieList', err)
      })
    },

    async fetchLibraryTVList() {
      mediasApi.getLibraryList('tv').then(res => {
        this.tvLibrary = res ?.length ? res : [""];
      }).catch(err => {
        console.log('fetchLibraryTVList', err)
      })
    },

    async initMediaStore() {
      this.fetchFavoriteMovieList();
      this.fetchFavoriteTVList();
      this.fetchLibraryMovieList();
      this.fetchLibraryTVList();
      this.updateGenre()
    },

    updateGenre() {
      mediasApi.getGenres().then((res) => {
        for (const genre of this.genres) { 
          genre.backgroundImage = genre.background
        }
        // for (const genre of res) {
        //   const backgroundImage = genre.media?.backdrop_path
        //   const genreObj = this.genres[String(genre.id)]
        //   const url = tmdbImgPrefix + backgroundImage
        //   genreObj.backgroundImage = genreObj.background + `, url(${url})`
        //   genreObj.latest = genre.media?.title || genre.media?.name
            
        // }
        console.log('updateGenre', this.genres)
      }).catch(err => {
        console.log(err)
      })
    }
  },
})