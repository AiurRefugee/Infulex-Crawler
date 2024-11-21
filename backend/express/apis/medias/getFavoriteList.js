const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, favoriteMovieCollection, favoriteTvCollection } = mongoConfig;

const getFavoriteList = async (mediaType) => {
    // TODO: 获取任务列表
    const mongoManager = new MongoManager();
    console.log('getFavoriteList', mediaType)
    let collection = null 
    if (mediaType === 'movie') {
        collection = mongoManager.getCollection(favoriteMovieCollection);
    } 
    if (mediaType === 'tv') {
        collection = mongoManager.getCollection(favoriteTvCollection);
    }  
    const listPromise = await collection.find({})
    const list = await listPromise.toArray()
    console.log('getFavoriteList', list)
    return list
}

const listenGetFavoriteList = (app) => {
    
    app.get('/getFavoriteList', async (req, res) => {
        console.log('getFavoriteList', req)
        const { mediaType } = req.query
        const insertRes = await getFavoriteList(mediaType)
        res.json(insertRes)
    })
}

// getFavoriteList('tv')

module.exports = listenGetFavoriteList