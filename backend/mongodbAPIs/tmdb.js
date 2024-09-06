
const { MongoClient } = require('mongodb');

const defaultPort = 27017

// 连接URL和数据库名称
const url = `mongodb://localhost:${defaultPort}`;
const dbName = 'mydb';

const {
    insertObject,
    setAliUrl,
    setImages,
    findObject,
    deleteObject,
    findOne
} = require('./common.js')

const { colletionsNames } = require('./basic.js')

const collections = {}

for (const name in colletionsNames) {
    collections[name] = null
}

let client = null
let db = null


async function init() {
    // 创建一个Mongo客户端
    if (!client || !db) {
        client = new MongoClient(url);
        try {
            await client.connect();
            db = client.db(dbName);
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
        }
    }
}

// 关闭与数据库的连接
async function closeConnection() {
    try {
        await client.close();
        console.log('Disconnected from MongoDB server');
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
    }
}

async function connectCollection(collectionName) {
    if (!collections || !collections[collectionName]) {
        const collection = await db.collection(collectionName);
        collections[collectionName] = collection;
        console.log('Connected to ', collectionName);
        return collection
    } else {
        return collections[collectionName]
    }
    
}


async function insertToCollection(collectionName, object) {
    var collection = collections[collectionName];
    if (!collection) {
        await connectCollection(collectionName)
        collection = collections[collectionName];
    }
    insertObject(collection, object)
}

async function setMediaAliUrl(collectionName, id, aliUrl) {
    var collection = collections[collectionName];
    if (!collection) {
        await connectCollection(collectionName)
        collection = collections[collectionName];
    }
    setAliUrl(collection, id, aliUrl);

}

// 设置剧照
async function setMeidaImages(collectionName, id, images) {
    var collection = collections[collectionName];
    if (!collection) {
        await connectCollection(collectionName)
        collection = collections[collectionName];
    }
    setImages(collection, id, images);
}

async function findFromCollecion(collectionName, params) {
    var collection = collections[collectionName];
    if (!collection) {
        await connectCollection(collectionName)
        collection = collections[collectionName]; 
    }
    return findObject(collection, params); 
}

async function findOneFromCollection(collectionName, query) {
    var collection = collections[collectionName];
    if (!collection) {
        await connectCollection(collectionName)
        collection = collections[collectionName];
    }
    const result = await findOne(collection, query)
    return result
}

async function deleteFromCollection(collectionName, id) {
    var collection = collections[collectionName];
    if (!collection) {
        await connectCollection(collectionName)
        collection = collections[collectionName]; 
    }
    deleteObject(collection, id) 
}



module.exports = { 
    init,
    insertToCollection,
    connectCollection,
    setMediaAliUrl,
    closeConnection,
    findFromCollecion,
    findOneFromCollection,
    deleteFromCollection,
    setMeidaImages,  
}