const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { removeGenres } = require('./updateGenres.js')
const { databaseUrl, dbName, movieLibraryCollection, tvLibraryCollection } = mongoConfig;

const removeFromLibrary = async (media, mediaType) => {
    const mediaId = media.id
    const mongoManager = new MongoManager(databaseUrl, dbName);

    let collection = null 
    if (mediaType === 'movie') {
        collection = mongoManager.getCollection(movieLibraryCollection);
        removeGenres(media)
    } 
    if (mediaType === 'tv') {
        collection = mongoManager.getCollection(tvLibraryCollection);
    }  
    const insertRes = await collection.deleteOne({ id: mediaId}) 
    console.log('delete favorite media', insertRes)
    return insertRes
}

const listenPOSTRemoveFromLibrary = (app) => {
    
    app.post('/removeFromLibrary', async (req, res) => {
        const { media, mediaType } = req.body
        const insertRes = await removeFromLibrary(media, mediaType)
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
    removeFromLibrary(194764, meidaType)
}

// test()
 

module.exports = listenPOSTRemoveFromLibrary