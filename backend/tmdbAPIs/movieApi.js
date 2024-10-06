const { get, post } = require('./axiosWrap')


const movieApi = {
    
    // 获取电影详情
    getMovieDetail: async (id) => {
        const url = baseUrl + '/movie/' + id
        const params = {
            language: 'zh-CN'
        }
        const filmDetail = await get(url, params)
        return filmDetail
    },
    // 获取电影演职员表
    getMovieCredits: async (id) => {
        const url = baseUrl + `/movie/${id}/credits`
        const params = {
            language: 'zh-CN'
        }
        const credits = await get(url, params)
        return credits
    },
    // 获取电影剧照
    getMovieImages: async (id) => {
        const url = baseUrl + '/movie/' + id + '/images'
        const images = await get(url)
        return images
    },
    similar: async (id) => {
        const url = baseUrl + '/movie/' + id + '/similar'
        const params = {
            language: 'zh-CN'
        }
        const similar = await get(url, params)
        return similar
    }


} 

module.exports = {
    movieApi
}