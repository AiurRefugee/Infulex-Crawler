const databaseUrl = 'mongodb://localhost:27017'
const dbName = 'infulex_craweler'

const mediaCollectionName = 'media'

const favoriteMovieCollection = 'favorite_movie'

const favoriteTvCollection = 'favorite_tv'

const userInfoCollectionName = 'user_info'

const movieLibraryCollection = 'movie_library'
const tvLibraryCollection = 'tv_library'

const generesCollectionName = 'generes'

const taskCollectionName = 'tasks'

const mongoConfig = {
    databaseUrl,
    dbName,
    taskCollectionName,
    mediaCollectionName,
    userInfoCollectionName,
    favoriteMovieCollection,
    favoriteTvCollection,
    movieLibraryCollection,
    tvLibraryCollection,
    generesCollectionName,
    taskCollectionName
}

module.exports = mongoConfig