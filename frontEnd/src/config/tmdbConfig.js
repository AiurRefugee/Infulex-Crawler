export const tmdbConifg = {
    apiKey: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTJjOWU2NzBhZDQyMGNkMjAzMWE3MTM4NTI1ZDEyMCIsIm5iZiI6MTcyNjE5NzM3Ny4yMjU1MjgsInN1YiI6IjY2ZTM4ZjY4YzgxYjI0YjNmZTIzZDQ0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gxD1UxBgcwNdGiFBnHF_FiomybTEZyPyPjX068nxoRI'
}

export const tmdbHeaders = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdbConifg.apiKey}`
    }
}

export const tmdbAPIPrefix = '/tmdb' 

export const tmdbImgPrefix = "https://image.tmdb.org/t/p/original"; 

export const getParams = {
    language: 'zh-CN'
}