const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, taskCollectionName } = mongoConfig;

const retryTask = async (mediaType, mediaId) => {
    console.log('retryTask', mediaType, mediaId)
    // TODO: 获取任务列表
    const mongoManager = new MongoManager();
    const tasks = mongoManager.getCollection(taskCollectionName);
    const res = await tasks.updateOne({ mediaType, mediaId }, { $set: { status: '进行中', msgs: []}}) 
    return res
}
const listenPOSTRetryTask = (app) => {
    
    app.post('/retryTask', async (req, res) => {
        const { mediaType, mediaId } = req.body
        console.log('retryTask', mediaType, mediaId)
        if (!mediaId || !mediaType) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        const insertRes = await retryTask(mediaType, mediaId)
        if (insertRes) {
            res.json({
                code: 200,
                message: 'retryTask 成功'
            })
        } else {
            res.json({
                code: 500,
                message: 'retryTask 失败'
            })
        }
    })
} 

module.exports = listenPOSTRetryTask