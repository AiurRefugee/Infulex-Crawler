import { get, post } from './axiosWrapper.js'

const baseUrl = 'https://api.themoviedb.org/3'

// 公共请求头 
const config = {
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTJjOWU2NzBhZDQyMGNkMjAzMWE3MTM4NTI1ZDEyMCIsIm5iZiI6MTcyNjE5NzM3Ny4yMjU1MjgsInN1YiI6IjY2ZTM4ZjY4YzgxYjI0YjNmZTIzZDQ0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gxD1UxBgcwNdGiFBnHF_FiomybTEZyPyPjX068nxoRI'
    }
}

export const tmdbApi = {
    searchMulti: async (keyword) => {
        const url = baseUrl + '/search/multi'
        const params = {
            query: keyword,
            page: 1,
            language: 'zh-CN'
        }
        const medias = await get(url, params, config)
        console.log('medias', medias)
        return medias
    }
}