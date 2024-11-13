const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { databaseUrl, dbName, generesCollectionName } = mongoConfig;

const { idMap } = require('../../../config/generes/index.js')

const addGenres = async (media) => {
    const generes = media.genres
    const mediaId = media.id
    const mongoManager = new MongoManager(databaseUrl, dbName);
    console.log('addGenres', mediaId, generes, generesCollectionName)
    const collection = mongoManager.getCollection(generesCollectionName)
    if (generes && generes.length > 0) {
        generes.forEach(item => {
            const id = item.id
            const name = idMap[id].name
            collection.updateOne({ id }, { $addToSet: { mediaId }, $set: { name } }, { upsert: true })
        })
    }

}

const removeGenres = async (media) => {
    const generes = media.genres;
    const mediaId = media.id;
    const mongoManager = new MongoManager(databaseUrl, dbName);
    console.log('removeGenres', mediaId, generes, generesCollectionName);
    const collection = mongoManager.getCollection(generesCollectionName);

    if (generes && generes.length > 0) {
        generes.forEach(item => {
            const id = item.id;
            collection.updateOne({ id }, { $pull: { mediaId } }, { multi: true });
        });
    }
};

const test = async () => {
    const movie = {
        "adult": false,
        "backdrop_path": "/Adrip2Jqzw56KeuV2nAxucKMNXA.jpg",
        "belongs_to_collection": null,
        "budget": 1200000,
        "genres": [
            {
                "id": 37,
                "name": "西部"
            }
        ],
        "homepage": "",
        "id": 429,
        "imdb_id": "tt0060196",
        "origin_country": [
            "IT"
        ],
        "original_language": "it",
        "original_title": "Il buono, il brutto, il cattivo",
        "overview": "意大利西部片宗师瑟吉欧·莱昂内执导的镖客电影三部曲的完结篇。由克林特·伊斯特伍德、李·范·克里夫和伊莱·沃勒克分饰英文片名所指的好人、坏人和丑恶之人。三人在美国南北战争期间趁着政局混乱，打算谋夺一批属于南方政府的财富，但每个人只知道一部分藏金的细节，必须联合起来才可以取得全部的钱，于是三人既互相利用又勾心斗角，产生不少有趣的笑料和张力十足的戏剧性对峙。",
        "popularity": 110.89,
        "poster_path": "/zgUSBMbmC5GJNT3vX5ZB7AmWoC2.jpg",
        "production_companies": [
            {
                "id": 60,
                "logo_path": "/4YldLvCWQL9VIAHQ2Fu3Ffkh9Si.png",
                "name": "United Artists",
                "origin_country": "US"
            },
            {
                "id": 7508,
                "logo_path": null,
                "name": "PEA",
                "origin_country": "IT"
            },
            {
                "id": 42498,
                "logo_path": null,
                "name": "Arturo González PC",
                "origin_country": "ES"
            },
            {
                "id": 47,
                "logo_path": "/i7Z9ot2o3N5Sa3HrF09kniFs2y8.png",
                "name": "Constantin Film",
                "origin_country": "DE"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            },
            {
                "iso_3166_1": "IT",
                "name": "Italy"
            },
            {
                "iso_3166_1": "ES",
                "name": "Spain"
            },
            {
                "iso_3166_1": "DE",
                "name": "Germany"
            }
        ],
        "release_date": "1966-12-22",
        "revenue": 38900000,
        "runtime": 161,
        "spoken_languages": [
            {
                "english_name": "Italian",
                "iso_639_1": "it",
                "name": "Italiano"
            }
        ],
        "status": "Released",
        "tagline": "对这三人来说内战不是地狱，是天堂",
        "title": "黄金三镖客",
        "video": false,
        "vote_average": 8.463,
        "vote_count": 8585
    }

    addGenres(movie)
}

module.exports = {
    addGenres,
    removeGenres
}