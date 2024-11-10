const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, movieLibarayyCollection, tvLibarayyCollection } = mongoConfig;

const removeFromLibary = async (mediaId, mediaType) => {
    // TODO: 获取任务列表
    const mongoManager = new MongoManager(databaseUrl, dbName);

    let collection = null 
    if (mediaType === 'movie') {
        collection = mongoManager.getCollection(movieLibarayyCollection);
    } 
    if (mediaType === 'tv') {
        collection = mongoManager.getCollection(tvLibarayyCollection);
    }  
    const insertRes = await collection.deleteOne({ id: mediaId}) 
    console.log('delete favorite media', insertRes)
    return insertRes
}

const listenPOSTRemoveFromLibary = (app) => {
    
    app.post('/removeFromLibary', async (req, res) => {
        const { media, mediaType } = req.body
        const insertRes = await removeFromLibary(media, mediaType)
        if (insertRes) {
            res.json({
                code: 200,
                message: '删除成功'
            })
        } else {
            res.json({
                code: 500,
                message: '添加失败'
            })
        }
    })
}

const test = () => { 
    const meidaType = 'tv'
    removeFromLibary(194764, meidaType)
}

// test()
 

module.exports = listenPOSTRemoveFromLibary