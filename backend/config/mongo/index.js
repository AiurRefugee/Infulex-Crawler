const databaseUrl = 'mongodb://localhost:27017'
const dbName = 'infulex_craweler'

const taskCollectionName = 'task'

const mediaCollectionName = 'media'

const favoriteMovieCollection = 'favorite_movie'

const favoriteTvCollection = 'favorite_tv'

const userInfoCollectionName = 'user_info'

const mongoConfig = {
    databaseUrl,
    dbName,
    taskCollectionName,
    mediaCollectionName,
    userInfoCollectionName,
    favoriteMovieCollection,
    favoriteTvCollection
}

module.exports = mongoConfig