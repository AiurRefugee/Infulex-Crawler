

const tmdb = require('../mongodbAPIs/tmdb.js')
const { colletionsNames } = require('../mongodbAPIs/basic.js')

const {
    TVEpisodeCollectionName,
    TVEpisodeCreditsCollectionName,
} = colletionsNames

function findTVEpisode(app) {
    app.post('/findTVEpisode', async (req, res) => {
        // 从请求体中获取 POST 请求传递的数据
        const queryObject = req.body;
        // 在控制台输出接收到的数据
        console.log('Received data:', queryObject);

        const results = await tmdb.findFromCollecion(TVEpisodeCollectionName, queryObject)

        // 做一些处理，例如存储到数据库或者返回给客户端
        // 这里简单地将接收到的数据返回给客户端
        res.json({ message: 'Find Films successfully', data: results });
    });
}

function findTVEpisodeCredits(app) {
    app.get('/findTVEpisodeCredits', async (req, res) => {
        const query = req.query;
        const TVEpisodeId = query.TVEpisodeId
        const credits = await tmdb.findFromCollecion(TVEpisodeCreditsCollectionName, [{ _id: Number(TVEpisodeId) }])
        res.json({ message: 'Get TVEpisode Actors successfully', data: credits });
    });
}

function setTVEpisodeBackend(app) {
    tmdb.init()
    findTVEpisode(app)
    findTVEpisodeCredits(app)
}

module.exports = setTVEpisodeBackend;