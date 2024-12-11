const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, taskCollectionName } = mongoConfig;

const finsishTask = async (mediaType, mediaId) => {
    console.log('finsishTask', mediaType, mediaId)
    // TODO: 获取任务列表
    const mongoManager = new MongoManager();
    const tasks = mongoManager.getCollection(taskCollectionName);
    const res = await tasks.updateOne({ mediaType, mediaId }, { $set: { status: '已完成' }}) 
    return res
} 

module.exports = finsishTask