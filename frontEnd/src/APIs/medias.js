import { get, post } from './axiosWrapper.js'
const infulexPrefix = '/api'

export const mediasApi = {

    findFavorite: async (mediaId, mediaType) => {
        const url = infulexPrefix + `/findFavorite`
        const data = {
            mediaId,
            mediaType
        }
        const result = await post(url, data)
        console.log('findFavorite', result)
        return result
    },

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
    getFavoriteList: async (mediaType, queryParam) => {
        const url = infulexPrefix + `/getFavoriteList`
        const params = {
            mediaType,
            queryParam
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
    getLibraryList: async (queryParm) => {
        const url = infulexPrefix + `/getLibraryList`
        const params = {
            ...queryParm
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
    },

    // 评分最高的电影
    getTopRatedMovies: async () => {
        const url = infulexPrefix + `/getTops`
        const topRatedMovies = await get(url)
        console.log('getTopRatedMovies', topRatedMovies)
        return topRatedMovies
    },

    // 获取类别
    getGenres: async () => {
        const url = infulexPrefix + `/getGenres`
        const genres = await get(url)
        console.log('getGenres', genres)
        return genres
    }

}

