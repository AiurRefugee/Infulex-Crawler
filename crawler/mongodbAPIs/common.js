async function insertObject(collection, object) {
    if (!collection) {
        console.log('collection is null');
        return false
    }
    const _id = object.id || object._id 
    const item = {
        _id: _id,
        ...object
    }
    const insertResult = await collection.updateOne(
        { _id }, // 查询条件
        {
            $set: { _id, item } // 更新的字段
        },
        {
            upsert: true // 如果不存在则插入
        }
    );
    if (!insertResult.acknowledged) {
        console.log('Inserted failed')
    }
}

async function setAliUrl(collection, id, aliUrl) {
    if (!collection) {
        console.log('collection is null');
        return false
    }
    const result = await collection.updateOne(
        { _id: id }, // 查询条件
        { $push: { aliUrl: aliUrl } }, // 更新的字段
    )
    if (!result.acknowledged) {
        console.log('setAliUrl failed')
    }
}

async function setImages(collection, id, images) {
    if (!collection) {
        console.log('collection is null');
        return false
    }
    const result = await collection.updateOne(
        { _id: id }, // 查询条件
        { $set: { images: images } }, // 更新的字段
    )
    if (!result.acknowledged) {
        console.log('setImages failed')
    }
}

async function findObject(collection, queryObjects, callback) {
    if (!collection) {
        console.log('collection is null');
        return false
    }
    console.log('query', ...queryObjects)
    var result = await collection.find(...queryObjects)
    if (typeof callback === 'function') {
        result = callback(result)
    }
    result = await result.toArray() 
    console.log('find', result)
    return result
}

async function deleteObject(collection, id) {
    if (!collection) {
        console.log('collection is null');
        return false
    }
    const result = await collection.deleteOne({ _id: id })
    if (!result.acknowledged) {
        console.log('deleteObject failed')
    } 
}

async function findOne(collection, queryObjects, callback) {
    if (!collection) {
        console.log('collection is null');
        return false
    } 
    const result = await collection.findOne(...queryObjects)
    if (typeof callback === 'function') {
        result = callback(result)
    }
    return result
}

module.exports = {
    insertObject,
    setAliUrl,
    setImages,
    findObject,
    deleteObject,
    findOne
}