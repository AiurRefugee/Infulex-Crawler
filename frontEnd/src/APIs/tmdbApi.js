import { get, post } from './axiosWrapper.js'

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTJjOWU2NzBhZDQyMGNkMjAzMWE3MTM4NTI1ZDEyMCIsIm5iZiI6MTcyNjE5NzM3Ny4yMjU1MjgsInN1YiI6IjY2ZTM4ZjY4YzgxYjI0YjNmZTIzZDQ0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gxD1UxBgcwNdGiFBnHF_FiomybTEZyPyPjX068nxoRI';
export const tmdbImgPrefix = "https://image.tmdb.org/t/p/original"
export const tmdbAPIPrefix = '/tmdb'
export const tmdbHeaders = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
}
export const GETParams = {
    language: 'zh-CN',
    'vote_count.gte': 5.0
}

export const tmdbApi = {
    tmdbImgPrefix,

    tmdbAPIPrefix,

    tmdbHeaders,

    GETParams,

    discover: async (mediaType, params) => {
        const url = tmdbAPIPrefix + `/discover/${mediaType}` 
        const medias = await get(url, params, tmdbHeaders)
        console.log('discover', medias)
        return medias
    },
    // search
    searchMulti: async (keyword, params) => {
        const url = tmdbAPIPrefix + '/search/multi'
        const queryParam = {
            query: keyword,
            ...params
        }
        const medias = await get(url, queryParam, tmdbHeaders)
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
    },

    getImages: async (id, type) => {
        let mediaType = null
        if (type === 'movie') {
            mediaType = 'movie'
        }
        if (type === 'tv') {
            mediaType = 'tv'
        }
        const url = tmdbAPIPrefix + `/${mediaType}/${id}/images`
        const images = await get(url, {}, tmdbHeaders)
        console.log('getImages', images)
        return images
    },

    // 获取正在播放的电影
    getNowPlayingMovies: async (params) => {
        const nowPlayingUrl = tmdbAPIPrefix + "/discover/movie?include_video=false&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}";
        const nowPlayingMovies = await get(nowPlayingUrl, params || GETParams, tmdbHeaders)
        console.log('getNowPlayingMovies', nowPlayingMovies)
        return nowPlayingMovies
    },

    // 每周电影趋势
    getTrendingMovies: async (params) => {
        const trendingUrl = tmdbAPIPrefix + "/trending/movie/week";
        const trendingMovies = await get(trendingUrl, params || GETParams, tmdbHeaders)
        console.log('getTrendingMovies', trendingMovies)
        return trendingMovies
    },

    // topRated 电影
    getTopRatedMovies: async (params) => {
        const topRatedUrl = tmdbAPIPrefix + "/discover/movie?include_adult=false&include_video=false&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200";
        const topRatedMovies = await get(topRatedUrl, params || GETParams, tmdbHeaders)
        console.log('getTopRatedMovies', topRatedMovies)
        return topRatedMovies
    },

    // 每周 TV 趋势
    getTrendingTVSeries: async (params) => {
        const trendingUrl = tmdbAPIPrefix + "/trending/tv/week";
        const trendingTVSeries = await get(trendingUrl, params || GETParams, tmdbHeaders)
        console.log('getTrendingTVSeries', trendingTVSeries)
        return trendingTVSeries
    },

    


}