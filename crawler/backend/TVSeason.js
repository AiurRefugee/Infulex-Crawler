

const tmdb = require('../mongodbAPIs/tmdb.js')
const { colletionsNames } = require('../mongodbAPIs/basic.js')

const {
    TVSeasonCollectionName,
    TVSeasonCreditsCollectionName,
} = colletionsNames

function findTVSeason(app) {
    app.post('/findTVSeason', async (req, res) => {
        // 从请求体中获取 POST 请求传递的数据
        const queryObject = req.body;
        // 在控制台输出接收到的数据
        console.log('Received data:', queryObject);

        const results = await tmdb.findFromCollecion(TVSeasonCollectionName, queryObject)

        // 做一些处理，例如存储到数据库或者返回给客户端
        // 这里简单地将接收到的数据返回给客户端
        res.json({ message: 'Find Films successfully', data: results });
    });
}

function findTVSeasonCredits(app) {
    app.get('/findTVSeasonCredits', async (req, res) => {
        const query = req.query;
        const TVSeasonId = query.TVSeasonId
        if (TVSeasonId) {
            const credits = await tmdb.findFromCollecion(TVSeasonCreditsCollectionName, [{ _id: Number(TVSeasonId) }])
            res.json({ message: 'Get TVSeason Actors successfully', data: credits });
        } else {
            res.json({ message: 'TVSeasonId required' });
        }
    });
}

function setTVSeasonBackend(app) {
    tmdb.init()
    findTVSeason(app)
    findTVSeasonCredits(app)
}

module.exports = setTVSeasonBackend;