const { get, post } = require('./axiosWrapper.js')

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
    return medias
}

//获取电影详情
async function getMovieDetail(id) {
    const url = baseUrl + '/movie/' + id
    const params = {
        language: 'zh-CN'
    }
    const filmDetail = await get(url, params)
    return filmDetail
}

// 获取电影演职员表
async function getMovieCredits(id) {
    const url = baseUrl + `/movie/${id}/credits`
    const params = {
        language: 'zh-CN'
    }
    const credits = await get(url, params)
    return credits
}

// 获取电影剧照
async function getMovieImages(id) {
    const url = baseUrl + '/movie/' + id + '/images'
    const images = await get(url)
    return images
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
    getMovieDetail,
    getMovieCredits,
    getMovieImages,
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