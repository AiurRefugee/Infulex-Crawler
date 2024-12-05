const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, favoriteMovieCollection, favoriteTvCollection } = mongoConfig;

const getFavoriteList = async (mediaType, queryParam) => {
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
    const pageNumber = queryParam.pageNumber ? parseInt(queryParam.pageNumber) : 1
    const pageSize = queryParam.pageSize ? parseInt(queryParam.pageSize) : mongoConfig.pageSize
    const sortBy = queryParam.sortBy ? queryParam.sortBy : {}
    const listPromise = await collection.find({}).sort(sortBy).skip((pageNumber - 1) * pageSize).limit(pageSize)
    const list = await listPromise.toArray()
    const total = await collection.countDocuments({})
    const totalPage = Math.ceil(total / pageSize) 
    console.log('getFavoriteList', list)
    return {
        data: list,
        totalPage
    }
}

const listenGetFavoriteList = (app) => {
    
    app.get('/getFavoriteList', async (req, res) => {
        console.log('getFavoriteList', req)
        const { mediaType, queryParam } = req.query
        const insertRes = await getFavoriteList(mediaType, queryParam)
        res.json(insertRes)
    })
}

// getFavoriteList('tv')

module.exports = listenGetFavoriteList