const axios = require('axios')
const { get, post } = require('../axios/axiosWrapper')

axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTJjOWU2NzBhZDQyMGNkMjAzMWE3MTM4NTI1ZDEyMCIsIm5iZiI6MTcyNjE5NzM3Ny4yMjU1MjgsInN1YiI6IjY2ZTM4ZjY4YzgxYjI0YjNmZTIzZDQ0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gxD1UxBgcwNdGiFBnHF_FiomybTEZyPyPjX068nxoRI'

const baseUrl = 'https://api.themoviedb.org/3'

async function searchMulti(keyword, year) {
    const queryKeyword = year ? `${keyword} y:${year}` : keyword
    const url = baseUrl + '/search/multi'
    const params = {
        query: queryKeyword,
        page: 1,
        language: 'zh-CN'
    }
    const medias = await get(url, params)
    console.log(medias)
    return medias
}
 

// 获取tv剧集详情
async function getTVDetail(id) {
    const url = baseUrl + '/tv/' + id
    const params = {
        language: 'zh-CN'
    }
    const tvDetail = await get(url, params)
    return tvDetail
}

// 获取tv剧集演职员表
async function getTVCredits(id) {
    const url = baseUrl + '/tv/' + id + '/credits'
    const params = {
        language: 'zh-CN'
    }
    const credits = await get(url, params)
    return credits
}

async function getTVImages(id) {
    const url = baseUrl + '/tv/' + id + '/images'
    const images = await get(url)
    return images
}

async function getTVSeasonDetail(tvId, season_number) {
    const url = baseUrl + '/tv/' + tvId + '/season/' + season_number
    const params = {
        language: 'zh-CN'
    }
    const seasonDetail = await get(url, params)
    return seasonDetail
}

async function getTVSeasonCredits(tvid, season_number) {
    const url = baseUrl + '/tv/' + tvid + '/season/' + season_number + '/credits'
    const params = {
        language: 'zh-CN'
    }
    const credits = await get(url, params)
    return credits
}

async function getTVSeasonImages(tvid, season_number) {
    const url = baseUrl + '/tv/' + tvid + '/season/' + season_number + '/images'
    const images = await get(url)
    return images
}

async function getEpisodeDetail(tvId, season_number, episode_number) {
    const url = baseUrl + '/tv/' + tvId + '/season/' + season_number + '/episode/' + episode_number
    const params = {
        language: 'zh-CN'
    }
    const episodeDetail = await get(url, params)
    return episodeDetail
}

async function getEpisodeCredits(tvId, season_number, episode_number) {
    const url = baseUrl + '/tv/' + tvId + '/season/' + season_number + '/episode/' + episode_number + '/credits'
    const params = {
        language: 'zh-CN'
    }
    const credits = await get(url, params)
    return credits
}

async function getEpisodeImages(tvId, season_number, episode_number) {
    const url = baseUrl + '/tv/' + tvId + '/season/' + season_number + '/episode/' + episode_number + '/images'
    const images = await get(url)
    return images
}



module.exports = { 
    searchMulti, 
    getTVDetail,
    getTVCredits,
    getTVImages,
    getTVSeasonDetail,
    getTVSeasonCredits,
    getTVSeasonImages,
    getEpisodeDetail,
    getEpisodeCredits,
    getEpisodeImages
}