const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, favoriteMovieCollection, favoriteTvCollection } = mongoConfig;

const removeFavorite = async (mediaId, mediaType) => {
    // TODO: 获取任务列表
    const mongoManager = new MongoManager(databaseUrl, dbName);

    let collection = null 
    if (mediaType === 'movie') {
        collection = mongoManager.getCollection(favoriteMovieCollection);
    } 
    if (mediaType === 'tv') {
        collection = mongoManager.getCollection(favoriteTvCollection);
    }  
    const insertRes = await collection.deleteOne({ id: mediaId}) 
    console.log('delete favorite media', insertRes)
    return insertRes
}

const listenPOSTRemoveFavorite = (app) => {
    
    app.post('/removeFavorite', async (req, res) => {
        const { mediaId, mediaType } = req.body
        const deleteRes = await removeFavorite(mediaId, mediaType)
        if (deleteRes) {
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
    removeFavorite(detail, meidaType)
}
 

module.exports = listenPOSTRemoveFavorite