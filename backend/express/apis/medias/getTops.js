const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, movieLibraryCollection, tvLibraryCollection } = mongoConfig;

const getTops = async (topNum) => {
    // TODO: 获取任务列表
    const mongoManager = new MongoManager(); 
    const collection = mongoManager.getCollection(movieLibraryCollection)
    const filter = {} 
    let insertRes = []
    if (topNum) {
        insertRes = await collection.find(filter).sort({vote_average: -1}).limit(topNum).toArray()
    } else {
        insertRes = await collection.find(filter).sort({vote_average: -1}).toArray()
    } 
    console.log('getTops', insertRes)
    return insertRes
}

const listenGetTops = (app) => {
    
    app.get('/getTops', async (req, res) => {
        const { topNum } = req.query 
        const insertRes = await getTops(topNum)
        res.json(insertRes)
    })
}

const test = () => {
    getTops(30)
}

// test()
 

module.exports = listenGetTops