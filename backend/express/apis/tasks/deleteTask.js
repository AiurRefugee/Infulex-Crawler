const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, taskCollectionName } = mongoConfig;

const deleteTask = async (mediaType, mediaId) => {
    console.log('deleteTask', mediaType, mediaId)
    // TODO: 获取任务列表
    const mongoManager = new MongoManager();
    const tasks = mongoManager.getCollection(taskCollectionName);
    tasks.deleteOne({ mediaType, mediaId }) 
}
const listenPOSTDeleteTask = (app) => {
    
    app.post('/deleteTask', async (req, res) => {
        const { mediaType, mediaId } = req.body
        console.log('deleteTask', mediaType, mediaId)
        if (!mediaId || !mediaType) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        const insertRes = await deleteTask(mediaType, mediaId)
        if (insertRes) {
            res.json({
                code: 200,
                message: 'deleteTask 删除成功'
            })
        } else {
            res.json({
                code: 500,
                message: 'deleteTask 删除失败'
            })
        }
    })
} 

module.exports = listenPOSTDeleteTask