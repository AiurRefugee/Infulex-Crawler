const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { favoriteMovieCollection, favoriteTvCollection } = mongoConfig;

const findFavorite = async (mediaId, mediaType) => {
    console.log('findFavorite', mediaId, mediaType)
    // TODO: 获取任务列表
    const mongoManager = new MongoManager();

    let collection = null 
    if (mediaType === 'movie') {
        collection = mongoManager.getCollection(favoriteMovieCollection);
    } 
    if (mediaType === 'tv') {
        collection = mongoManager.getCollection(favoriteTvCollection);
    }  
    if (!collection) {
        return null
    }
    const filter = { id: Number(mediaId) }  
    const findRes = await collection.findOne(filter) 
    console.log('get favorite media', findRes)
    return findRes
}

const listenPOSTfindFavorite = (app) => {
    
    app.post('/findFavorite', async (req, res) => {
        const { mediaId, mediaType } = req.body
        if (!mediaId || !mediaType) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        const findRes = await findFavorite(mediaId, mediaType)
        if (findRes) {
            res.json({
                code: 200,
                message: '查找成功',
                data: findRes
            })
        } else {
            res.json({
                code: 500,
                message: '查找失败'
            })
        }
    })
}
 

module.exports = listenPOSTfindFavorite