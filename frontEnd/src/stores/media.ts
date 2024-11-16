import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { genres } from '@/config/genre'
import { tmdbImgPrefix } from "@/config/tmdbConfig.js";

import { mediasApi } from "@/apis/medias.js";

export const useMediaStore = defineStore('films', {
  state: () => ({
    favoriteMovies: [],
    favoriteTVs: [],
    movieLibrary: [],
    tvLibrary: [],
    genres: {...genres}
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
      const movies = await mediasApi.getFavoriteList('movie');
      this.favoriteMovies = movies;
    },

    async fetchFavoriteTVList() {
      const tvs = await mediasApi.getFavoriteList('tv');
      this.favoriteTVs = tvs;
    },

    async fetchLibraryMovieList() {
      const movies = await mediasApi.getLibraryList('movie');
      this.movieLibrary = movies;
    },

    async fetchLibraryTVList() {
      const tvs = await mediasApi.getLibraryList('tv');
      this.tvLibrary = tvs;
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
        for (const id in this.genres) {
          const genre = this.genres[id]
          genre.backgroundImage = genre.background
        }
        for (const genre of res) {
          const backgroundImage = genre.media?.backdrop_path
          const genreObj = this.genres[String(genre.id)]
          const url = tmdbImgPrefix + backgroundImage
          genreObj.backgroundImage = genreObj.background + `, url(${url})`
          genreObj.latest = genre.media?.title || genre.media?.name
            
        }
        console.log('updateGenre', this.genres)
      }).catch(err => {
        console.log(err)
      })
    }
  },
})