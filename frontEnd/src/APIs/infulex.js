import { get, post } from './axiosWrapper.js'
const infulexPrefix = '/api'

export const infulexApi = {

    // 收藏
    addFavorite: async (media, mediaType) => {
        const url = infulexPrefix + `/addFavorite`
        const data = {
            media,
            mediaType
        }
        const result = await post(url, data)
        console.log('addFavorite', result)
        return result
    },

    // 收藏的列表
    getFavoriteList: async (mediaType) => {
        const url = infulexPrefix + `/getFavoriteList`
        const params = {
            mediaType
        }
        const favoriteMovies = await get(url, params)
        console.log('getFavoriteList', favoriteMovies)
        return favoriteMovies
    },

}

