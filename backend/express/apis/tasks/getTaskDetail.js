const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { taskCollectionName } = mongoConfig;


const getTaskDetail = async (mediaType, mediaId) => {
    console.log('getTaskDetail', mediaId, mediaType)
    const mongoManager = new MongoManager();
    const tasks = mongoManager.getCollection(taskCollectionName);
    const query = { mediaId, mediaType }
    const taskDetail = await tasks.findOne(query)
    return taskDetail
}


const listenPOSTaskDetail = (app) => {
    
    app.post('/getTaskDetail', async (req, res) => {
        const { mediaId, mediaType } = req.body
        console.log('getTaskDetail', mediaId, mediaType)
        if (!mediaId || !mediaType) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        const insertRes = await getTaskDetail(mediaType, mediaId)
        if (insertRes) {
            res.json(insertRes)
        } else {
            res.json({
                code: 500,
                message: 'getTaskDetail失败'
            })
        }
    })
}

const test = () => {
    
    const meidaType = 'tv'
    const mediaId = 94605
    getTaskDetail(meidaType, mediaId).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}
 
 

module.exports = listenPOSTaskDetail