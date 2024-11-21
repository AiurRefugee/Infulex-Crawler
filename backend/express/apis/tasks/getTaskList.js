const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, taskCollectionName } = mongoConfig;

const getTaskList = async () => {
    // TODO: 获取任务列表
    const mongoManager = new MongoManager();
    const tasks = mongoManager.getCollection(taskCollectionName);
    const query = {}
    const listPromise = await tasks.find(query)
    const list = await listPromise.toArray()
    console.log('getTaskList', list)
    return list
}

const listenGetTaskList = (app) => {
    
    app.get('/getTaskList', async (req, res) => {
        const list = await getTaskList()
        res.json(list)
    })
}

// getTaskList()

module.exports = listenGetTaskList