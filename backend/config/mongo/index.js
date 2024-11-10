const databaseUrl = 'mongodb://localhost:27017'
const dbName = 'infulex_craweler'

const taskCollectionName = 'task'

const mediaCollectionName = 'media'

const favoriteMovieCollection = 'favorite_movie'

const favoriteTvCollection = 'favorite_tv'

const userInfoCollectionName = 'user_info'

const movieLibarayyCollection = 'movie_library'
const tvLibarayyCollection = 'tv_library'

const mongoConfig = {
    databaseUrl,
    dbName,
    taskCollectionName,
    mediaCollectionName,
    userInfoCollectionName,
    favoriteMovieCollection,
    favoriteTvCollection,
    movieLibarayyCollection,
    tvLibarayyCollection
}

module.exports = mongoConfig