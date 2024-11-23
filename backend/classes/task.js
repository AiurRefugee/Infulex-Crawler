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
            createdAt: new Date(),

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
        const { mediaId, mediaType } = this;

        const mongoManager = new MongoManager();
        const taskCollection = mongoManager.getCollection(taskCollectionName);

        return taskCollection.findOne({ id, mediaType });
    }

    addMsg(msg) {
        
        const task = this.task
        const { mediaId, mediaType } = task;
        console.log('addMsg', this, msg)
        task.msgs.push(msg);
        const mongoManager = new MongoManager();
        const taskCollection = mongoManager.getCollection(taskCollectionName);
        taskCollection.updateOne({ mediaId, mediaType}, { $push: { msgs: msg } });

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

