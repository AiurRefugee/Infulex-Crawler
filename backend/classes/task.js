const MongoManager = require('./mongoManager')
const path = require('path');
const configPath = path.resolve(__dirname, '../config/mongo/index.js');
const mongoConfig = require(configPath);

const { taskCollectionName } = mongoConfig;

class Task {
    constructor(mediaId, mediaType, title, backdropPath) {
        const task = {
            mediaId,
            mediaType,
            title,
            backdropPath,
            status: '进行中',
            msgs: [],
            createdAt: (new Date()).toLocaleString(),

        }
        this.task = task
        this.insertTask()
    }

    // Getters
    getId() {
        return this.id;
    }

    getStatus() {
        return this.status;
    }

    getTaskInDb() {
        const task = this.task
        const { mediaId, mediaType } = task;

        const mongoManager = new MongoManager();
        const taskCollection = mongoManager.getCollection(taskCollectionName);

        return taskCollection.findOne({ id, mediaType });
    }

    updateTaskStatus(status) {
        const task = this.task
        const { mediaId, mediaType } = task;

        const mongoManager = new MongoManager();
        const taskCollection = mongoManager.getCollection(taskCollectionName);

        taskCollection.updateOne({ mediaId, mediaType }, { $set: { status } });
    }

    addMsg(msg) {
        const task = this.task
        const { mediaId, mediaType } = task; 
        task.msgs.push(msg);
        const mongoManager = new MongoManager();
        const taskCollection = mongoManager.getCollection(taskCollectionName);
        taskCollection.updateOne({ mediaId, mediaType}, { $push: { msgs: msg } });
        const { type } = msg
        console.log('add msg', type)
        if (type == 'TASK Done') {
            task.status = '已完成'
            taskCollection.updateOne({ mediaId, mediaType}, { $set: { status: '已完成' } });
        }
        if (type == 'Share_Token Error') {
            const failedLink = msg.data[0]
            console.log('failedLink', failedLink)
            for (const msg of task.msgs) {
                if (msg.type == 'GET Links') {
                    const index = msg.data.findIndex(item => item.link == failedLink)
                    if (index != -1) {
                        msg.data[index].status = 'failed'
                        break
                    }
                }
            } 
            this.updateLink(failedLink, 'failed')
        }
    }

    async updateLink (link, status) { 
        console.log(link, 'failed')
        const { mediaId, mediaType } = this.task;
        const mongoManager = new MongoManager();
        const taskCollection = mongoManager.getCollection(taskCollectionName);
        taskCollection.updateOne(
            { mediaId, mediaType }, 
            { $set: { "msgs.$[elem].data.$[item].status": status} }, 
            { arrayFilters: [ { "elem.type": "GET Links" }, { "item.link": link } ] }
        ).then(updateRes => {
            console.log('updateLink', updateRes)
        }) 
         
    }

    subscribeProxy(topicId, eventManager) {
        const taskObj = this
        eventManager.subscribe(topicId, (data) => {
            taskObj.addMsg(data)
        });
    }

    getTask() {
        return this.task
    }

    insertTask() {
        const mongoManager = new MongoManager();
        const taskCollection = mongoManager.getCollection(taskCollectionName);
        const task = this.task
        const { mediaId, mediaType } = task;
        const filter = { mediaId, mediaType }
        const updateDoc = {
            $set: task
        }
        const options = { upsert: true }
        taskCollection.updateOne(filter, updateDoc, options).then(res => {
            console.log('insertTask', res)
        })
    }
} 

module.exports = { Task }

