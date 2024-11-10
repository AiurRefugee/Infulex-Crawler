const { MongoClient } = require('mongodb');
const path = require('path');
const configPath = path.resolve(__dirname, '../config/mongo/index.js');
const mongoConfig = require(configPath); 

// 单例类
class MongoManager {
    constructor(databaseUrl, dbName) {
        // 确保只创建一个实例
        if (!MongoManager.instance) {
            this.databaseUrl = databaseUrl 
            this.dbName = dbName;
            this.client = null;
            this.db = null;
            MongoManager.instance = this;

        }
        return MongoManager.instance;
    }

    // 连接到数据库
    connect() {
        if (this.client && this.db) {
            return this.db
        }
        this.client = new MongoClient(this.databaseUrl); // 连接到MongoDB服务器
        this.db = this.client.db(this.dbName); // 选择数据库
    }

    // 获取数据库连接
    getDb() {
        if (!this.db) {
            throw new Error('Database connection has not been established.');
        }
        return this.db;
    }

    // 获取指定集合
    getCollection(collectionName) { 
        try {
            if (!this.db) {
                this.connect()
            }
            return this.db.collection(collectionName);
        } catch (err) {
            console.log('getCollection error', err);
            return false
        }
    }

    // 关闭数据库连接
    close() {
        return new Promise((resolve, reject) => {
            if (this.client) {
                this.client.close(false, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            }
        });
    }
}

module.exports = MongoManager