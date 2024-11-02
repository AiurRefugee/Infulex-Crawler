import { get, post } from './axiosWrapper.js'

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTJjOWU2NzBhZDQyMGNkMjAzMWE3MTM4NTI1ZDEyMCIsIm5iZiI6MTcyNjE5NzM3Ny4yMjU1MjgsInN1YiI6IjY2ZTM4ZjY4YzgxYjI0YjNmZTIzZDQ0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gxD1UxBgcwNdGiFBnHF_FiomybTEZyPyPjX068nxoRI';
const tmdbImgPrefix = "https://image.tmdb.org/t/p/original"
const tmdbAPIPrefix = '/tmdb'
const tmdbHeaders = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
}
const GETParams = {
    language: 'zh-CN'
}

export const tmdbApi = {
    apiKey,

    tmdbHeaders,

    tmdbImgPrefix,

    tmdbAPIPrefix: '/tmdb',

    GETParams,

    searchMulti: async (keyword) => {
        const url = tmdbAPIPrefix + '/search/multi'
        const params = {
            query: keyword,
            page: 1,
            language: 'zh-CN'
        }
        const medias = await get(url, params, tmdbHeaders)
        console.log('medias', medias)
        return medias
    },
    searchMovie: async (keyword, year) => {
        const url = tmdbAPIPrefix + '/search/movie'
        const params = {
            query: keyword,
            year: year,
            page: 1,
            language: 'zh-CN'
        }
        const movies = await get(url, params, tmdbHeaders)
        console.log('movies', movies)
        return movies
    },
    searchTVSeries: async (keyword, year) => {
        const url = tmdbAPIPrefix + '/search/tv'
        const params = {
            query: keyword,
            first_air_date_year: year,
            page: 1,
            language: 'zh-CN'
        }
        const tvSeries = await get(url, params, tmdbHeaders)
        console.log('tvSeries', tvSeries)
        return tvSeries
    },

    // movie
    getMoviewDetail: async (id) => {
        const url = tmdbAPIPrefix + `/movie/${id}`
        const detail = await get(url, GETParams, tmdbHeaders)
        console.log('getMoviewDetail', detail)
        return detail
    }, 
    getMovieCredits: async (id) => {
        const url = tmdbAPIPrefix + `/movie/${id}/credits`
        const credits = await get(url, GETParams, tmdbHeaders)
        console.log('getMovieCredits', credits)
        return credits
    },
    getSimilarMovies: async (id) => {
        const url = tmdbAPIPrefix + `/movie/${id}/similar`
        const similarMovies = await get(url, GETParams, tmdbHeaders)
        console.log('getSimilarMovies', similarMovies)
        return similarMovies
    },
    getSimilarMovie: async (id) => {
        const url = tmdbAPIPrefix + `/movie/${id}/similar`
        const similarMovies = await get(url, GETParams, tmdbHeaders)
        console.log('getSimilarMovie', similarMovies)
        return similarMovies
    },

    // tv
    getTVDetail: async (id) => {
        const url = tmdbAPIPrefix + `/tv/${id}`
        const detail = await get(url, GETParams, tmdbHeaders)
        console.log('getTVDetail', detail)
        return detail
    },
    getSeasonDetail: async (id, season_number) => {
        const url = tmdbAPIPrefix + `/tv/${id}/season/${season_number}`
        const detail = await get(url, GETParams, tmdbHeaders)
        console.log('getSeasonDetail', detail)
        return detail
    },
    getEpisodeDetail: async (id, season_number, episode_number) => {
        const url = tmdbAPIPrefix + `/tv/${id}/season/${season_number}/episode/${episode_number}`
        const detail = await get(url, GETParams, tmdbHeaders)
        console.log('getEpisodeDetail', detail)
        return detail
    },
    getEpisodeCredits: async (id, season_number, episode_number) => {
        const url = tmdbAPIPrefix + `/tv/${id}/season/${season_number}/episode/${episode_number}/credits`
        const credits = await get(url, GETParams, tmdbHeaders)
        console.log('getEpisodeCredits', credits)
        return credits
    }, 

    getSimilarTVSeries: async (id) => {
        const url = tmdbAPIPrefix + `/tv/${id}/similar`
        const similarTVSeries = await get(url, GETParams, tmdbHeaders)
        console.log('getSimilarTVSeries', similarTVSeries)
        return similarTVSeries
    }

}