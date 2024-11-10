const MongoManager = require('./mongoManager')
const path = require('path');
const configPath = path.resolve(__dirname, '../config/mongo/index.js');
const mongoConfig = require(configPath);

const { databaseUrl, dbName, taskCollectionName } = mongoConfig;


class Task {
    constructor(media, mediaType) {

        this.id = media.id;
        this.mediaType = mediaType;
        this.media = media;
        this.title = media?.title || media?.name;
        const msgs = []
        msgs.push({
            type: 'Task Created',
            time: new Date(),
        })
        this.msgs = msgs
        this.status = '进行中'
        this.insertTask()
        
    }

    // Getters
    getId() {
        return this.id;
    }

    getStatus() {
        return this.status;
    }

    getTask() {
        const { id, title, status, msgs, mediaType, media } = this;
        return { id, title, status, msgs, mediaType, media };
    }

    insertTask() {
        const mongoManager = new MongoManager(databaseUrl, dbName);
        const taskCollection = mongoManager.getCollection(taskCollectionName);
        const task = this.getTask()
        taskCollection.insertOne(task).then( res => {
            console.log('insertTask', res)
        })
    }
}

const media = {
    "adult": false,
    "backdrop_path": "/3sh2UA2Q2l7fihgoj1LhFFPTlIM.jpg",
    "belongs_to_collection": {
        "id": 558216,
        "name": "毒液（系列）",
        "poster_path": "/egb0haW6JxjJz9vWLViSzXRxF0T.jpg",
        "backdrop_path": "/vq340s8DxA5Q209FT8PHA6CXYOx.jpg"
    },
    "budget": 120000000,
    "genres": [
        {
            "id": 878,
            "name": "科幻"
        },
        {
            "id": 28,
            "name": "动作"
        },
        {
            "id": 12,
            "name": "冒险"
        }
    ],
    "homepage": "",
    "id": 912649,
    "imdb_id": "tt16366836",
    "origin_country": [
        "US"
    ],
    "original_language": "en",
    "original_title": "Venom: The Last Dance",
    "overview": "面对入侵地球的外星共生体大军，毒液和埃迪（汤姆·哈迪 Tom Hardy 饰）迎来至暗时刻。这一次，只有死亡才能将他们分开。",
    "popularity": 5184.196,
    "poster_path": "/eMnWFvrTtNk0kJCVkKGzUUvUWJI.jpg",
    "production_companies": [
        {
            "id": 5,
            "logo_path": "/71BqEFAF4V3qjjMPCpLuyJFB9A.png",
            "name": "Columbia Pictures",
            "origin_country": "US"
        },
        {
            "id": 84041,
            "logo_path": "/nw4kyc29QRpNtFbdsBHkRSFavvt.png",
            "name": "Pascal Pictures",
            "origin_country": "US"
        },
        {
            "id": 53462,
            "logo_path": "/nx8B3Phlcse02w86RW4CJqzCnfL.png",
            "name": "Matt Tolmach Productions",
            "origin_country": "US"
        },
        {
            "id": 91797,
            "logo_path": null,
            "name": "Hutch Parker Entertainment",
            "origin_country": "US"
        },
        {
            "id": 14439,
            "logo_path": null,
            "name": "Arad Productions",
            "origin_country": "US"
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "2024-10-22",
    "revenue": 310000000,
    "runtime": 109,
    "spoken_languages": [
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Released",
    "tagline": "直到死亡将我们分开",
    "title": "毒液：最后一舞",
    "video": false,
    "vote_average": 6.7,
    "vote_count": 491
}

const task = new Task(media, 'movie');



module.exports = { Task }

