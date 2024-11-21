const MongoManager = require('../../../classes/mongoManager.js')
const mongoConfig = require('../../../config/mongo/index.js');
const { addGenres } = require('./updateGenres.js')
const { databaseUrl, dbName, movieLibraryCollection, tvLibraryCollection } = mongoConfig;

const addToLibrary = async (media, mediaType) => {
    // TODO: 获取任务列表
    const mongoManager = new MongoManager();

    let collection = null 
    if (mediaType === 'movie') {
        collection = mongoManager.getCollection(movieLibraryCollection);
        addGenres(media)
    } 
    if (mediaType === 'tv') {
        collection = mongoManager.getCollection(tvLibraryCollection);
    }  
    const filter = { id: media.id }
    const updateDoc = {
        $set: media
    }
    const options = { upsert: true }
    const insertRes = await collection.updateOne(filter, updateDoc, options) 
    console.log('addToLibrary', insertRes)
    return insertRes
}

const listenPOSTAddToLibrary = (app) => {
    
    app.post('/addToLibrary', async (req, res) => {
        const { media, mediaType } = req.body
        if (!media || !mediaType) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        const insertRes = await addToLibrary(media, mediaType)
        if (insertRes) {
            res.json({
                code: 200,
                message: 'addToLibrary 添加成功'
            })
        } else {
            res.json({
                code: 500,
                message: 'addToLibrary 添加失败'
            })
        }
    })
}

const test = () => {
    const detail = {
        "adult": false,
        "backdrop_path": "/VSRmtRlYgd0pBISf7d34TAwWgB.jpg",
        "created_by": [
            {
                "id": 1223896,
                "credit_id": "65395429091e620138b3caa2",
                "name": "Lauren LeFranc",
                "original_name": "Lauren LeFranc",
                "gender": 1,
                "profile_path": null
            }
        ],
        "episode_run_time": [],
        "first_air_date": "2024-09-19",
        "genres": [
            {
                "id": 18,
                "name": "剧情"
            },
            {
                "id": 80,
                "name": "犯罪"
            }
        ],
        "homepage": "https://www.hbo.com/the-penguin",
        "id": 194764,
        "in_production": true,
        "languages": [
            "en"
        ],
        "last_air_date": "2024-11-03",
        "last_episode_to_air": {
            "id": 5514596,
            "name": "高顶礼帽",
            "overview": "奥兹努力保护他的家庭和事业，而索菲亚则有了一个令人震惊的发现。",
            "vote_average": 8.2,
            "vote_count": 5,
            "air_date": "2024-11-03",
            "episode_number": 7,
            "episode_type": "standard",
            "production_code": "",
            "runtime": 47,
            "season_number": 1,
            "show_id": 194764,
            "still_path": "/eU9qFjD98jA5AChyANK8zc52N2o.jpg"
        },
        "name": "企鹅人",
        "next_episode_to_air": {
            "id": 5514597,
            "name": "大事或小事",
            "overview": "随着奥兹·科布接近旅程的终点，他与索菲亚的权力斗争也达到了高潮，真相逐渐浮出水面。",
            "vote_average": 10,
            "vote_count": 1,
            "air_date": "2024-11-10",
            "episode_number": 8,
            "episode_type": "finale",
            "production_code": "",
            "runtime": 68,
            "season_number": 1,
            "show_id": 194764,
            "still_path": null
        },
        "networks": [
            {
                "id": 49,
                "logo_path": "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
                "name": "HBO",
                "origin_country": "US"
            }
        ],
        "number_of_episodes": 8,
        "number_of_seasons": 1,
        "origin_country": [
            "US"
        ],
        "original_language": "en",
        "original_name": "The Penguin",
        "overview": "讲述企鹅人奥斯瓦尔德·“奥兹”·科波特在哥谭市黑社会中崛起的故事。‌海堤炸毁后，哥谭市处于危险之中，奥兹试图填补卡迈恩·法尔科内去世留下的权力真空，好让母亲过上自己一直承诺的生活。为此，他必须直面所有敌人，包括卡迈恩的孩子索菲亚和阿尔贝托、萨尔瓦多领导的马罗尼家族、以及自己作为企鹅人的败坏声誉。",
        "popularity": 821.589,
        "poster_path": "/ia3J58V58ABXMlqZQFHwmtwMMTW.jpg",
        "production_companies": [
            {
                "id": 101405,
                "logo_path": null,
                "name": "6th & Idaho",
                "origin_country": "US"
            },
            {
                "id": 119245,
                "logo_path": "/6F45uVsKpNYANcWvplyhgIFezFU.png",
                "name": "Dylan Clark Productions",
                "origin_country": "US"
            },
            {
                "id": 1957,
                "logo_path": "/pJJw98MtNFC9cHn3o15G7vaUnnX.png",
                "name": "Warner Bros. Television",
                "origin_country": "US"
            },
            {
                "id": 184898,
                "logo_path": "/2Z2hiM1ERqFOWRxNxWoJZ8lTxhb.png",
                "name": "DC Studios",
                "origin_country": "US"
            },
            {
                "id": 239486,
                "logo_path": null,
                "name": "Acid and Tender Productions",
                "origin_country": "US"
            },
            {
                "id": 225329,
                "logo_path": "/haFdiPRSK9wRJ3xQZOqRNpk77jB.png",
                "name": "Chapel Place Productions",
                "origin_country": "IE"
            },
            {
                "id": 154341,
                "logo_path": null,
                "name": "Zobot Projects",
                "origin_country": "US"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "IE",
                "name": "Ireland"
            },
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "seasons": [
            {
                "air_date": "2024-09-19",
                "episode_count": 8,
                "id": 282693,
                "name": "第 1 季",
                "overview": "讲述企鹅人奥斯瓦尔德·“奥兹”·科波特在哥谭市黑社会中崛起的故事。‌海堤炸毁后，哥谭市处于危险之中，奥兹试图填补卡迈恩·法尔科内去世留下的权力真空，好让母亲过上自己一直承诺的生活。为此，他必须直面所有敌人，包括卡迈恩的孩子索菲亚和阿尔贝托、萨尔瓦多领导的马罗尼家族、以及自己作为企鹅人的败坏声誉。",
                "poster_path": "/vOWcqC4oDQws1doDWLO7d3dh5qc.jpg",
                "season_number": 1,
                "vote_average": 8.5
            }
        ],
        "spoken_languages": [
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            }
        ],
        "status": "Returning Series",
        "tagline": "",
        "type": "Miniseries",
        "vote_average": 8.5,
        "vote_count": 293
    }
    const meidaType = 'tv'
    addToLibrary(detail, meidaType)
}

// test()
 

module.exports = listenPOSTAddToLibrary