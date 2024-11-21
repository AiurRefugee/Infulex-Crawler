const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, generesCollectionName } = mongoConfig;

const getGenres = async () => {
    
    const mongoManager = new MongoManager();
    const collection = mongoManager.getCollection(generesCollectionName)
    const pipline = [
        {
            $unwind: "$mediaId"
        },
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                latestMediaId: { $last: "$mediaId" },
                id: { $first: "$id" }
            }
        },
        {
            $lookup: {
                from: "movie_library",
                localField: "latestMediaId",
                foreignField: "id",
                as: "media"
            }
        },
        {
            $set: {
                media: { $first: "$media" },
            }
        }
    ]
    const result = await collection.aggregate(pipline).toArray()
    return result
}

const listenGetGenres = (app) => {
    
    app.get('/getGenres', async (req, res) => { 
        const array = await getGenres()
        console.log('getGenres result', array)
        res.json(array)
    })
}

module.exports = listenGetGenres