const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, movieLibraryCollection, tvLibraryCollection } = mongoConfig;

const getLibaray = async (mediaType, page, pageSize) => {
    // TODO: 获取任务列表
    const mongoManager = new MongoManager();
    console.log('getFavoriteList', mediaType, page, pageSize)
    let collection = null 
    if (mediaType === 'movie') {
        collection = mongoManager.getCollection(movieLibraryCollection);
    } 
    if (mediaType === 'tv') {
        collection = mongoManager.getCollection(tvLibraryCollection);
    }  
    const totalDocuments = collection.countDocuments();
    const totalPages = Math.ceil(totalDocuments / pageSize);
    const listPromise = await collection.find({}).skip((page - 1) * pageSize).limit(pageSize);
    const list = await listPromise.toArray()
    console.log('getFavoriteList', list)
    return {
        totalPages,
        list
    }
}

const listenGetLibraryList = (app) => {
    
    app.get('/getLibraryList', async (req, res) => {
        console.log('getLibraryList', req)
        const { mediaType, page, pageSize } = req.query
        const { list, totalPages} = await getLibaray(mediaType, Number(page), Number(pageSize))
        res.json({
            list,
            totalPages
        })
    })
}

// getFavoriteList('tv')

module.exports = listenGetLibraryList