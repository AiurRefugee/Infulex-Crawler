const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, movieLibraryCollection, tvLibraryCollection } = mongoConfig;

const getLibaray = async (mediaType) => {
    // TODO: 获取任务列表
    const mongoManager = new MongoManager();
    console.log('getFavoriteList', mediaType)
    let collection = null 
    if (mediaType === 'movie') {
        collection = mongoManager.getCollection(movieLibraryCollection);
    } 
    if (mediaType === 'tv') {
        collection = mongoManager.getCollection(tvLibraryCollection);
    }  
    const listPromise = await collection.find({})
    const list = await listPromise.toArray()
    console.log('getFavoriteList', list)
    return list
}

const listenGetLibraryList = (app) => {
    
    app.get('/getLibraryList', async (req, res) => {
        console.log('getLibraryList', req)
        const { mediaType } = req.query
        const insertRes = await getLibaray(mediaType)
        res.json(insertRes)
    })
}

// getFavoriteList('tv')

module.exports = listenGetLibraryList