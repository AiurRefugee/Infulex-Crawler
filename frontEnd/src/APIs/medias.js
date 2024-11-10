import { get, post } from './axiosWrapper.js'
const infulexPrefix = '/api'

export const mediasApi = {

    // 收藏
    addToFavorite: async (media, mediaType) => {
        const url = infulexPrefix + `/addToFavorite`
        const data = {
            media,
            mediaType
        }
        const result = await post(url, data)
        console.log('addToFavorite', result)
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

    // 取消收藏
    removeFavorite: async (mediaId, mediaType) => {
        const url = infulexPrefix + `/removeFavorite`
        const data = {
            mediaId,
            mediaType
        }
        const result = await post(url, data)
        console.log('removeFavorite', result)
        return result
    },

    // 添加到资料库
    addToLibrary: async (media, mediaType) => {
        const url = infulexPrefix + `/addToLibrary`
        const data = {
            media,
            mediaType
        }
        const result = await post(url, data)
        console.log('addToLibrary', result)
        return result
    },

    // 资料库列表
    getLibraryList: async (mediaType) => {
        const url = infulexPrefix + `/getLibraryList`
        const params = {
            mediaType
        }
        const libraryMovies = await get(url, params)
        console.log('getLibraryList', libraryMovies)
        return libraryMovies
    },

    // 从资料库移除
    removeFromLibrary: async (media, mediaType) => {
        const url = infulexPrefix + `/removeFromLibrary`
        const data = {
            media,
            mediaType
        }
        const result = await post(url, data)
        console.log('removeFromLibrary', result)
        return result
    }

}

