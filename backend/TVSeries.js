

const tmdb = require('../mongodbAPIs/tmdb.js')
const { colletionsNames } = require('../mongodbAPIs/basic.js')

const {
    TVSeriesCollectionName,
    TVSeriesCreditsCollectionName,
} = colletionsNames

function findTVSeries(app) {
    app.post('/findTVSeries', async (req, res) => {
        // 从请求体中获取 POST 请求传递的数据
        const queryObject = req.body;
        // 在控制台输出接收到的数据
        console.log('Received data:', queryObject);

        const results = await tmdb.findFromCollecion(TVSeriesCollectionName, queryObject)

        // 做一些处理，例如存储到数据库或者返回给客户端
        // 这里简单地将接收到的数据返回给客户端
        res.json({ message: 'Find Films successfully', data: results });
    });
}

function findTVSeriesCredits(app) {
    app.get('/findTVSeriesCredits', async (req, res) => {
        const query = req.query;
        const TVSeriesId = query.TVSeriesId
        if (TVSeriesId) {
            const credits = await tmdb.findFromCollecion(TVSeriesCreditsCollectionName, [{ _id: Number(TVSeriesId) }])
            res.json({ message: 'Get TVSeries Actors successfully', data: credits });
        } else {
            res.json({ message: 'TVSeriesId is required' });
        }
    });
}

function setTVSeriesBackend(app) {
    tmdb.init()
    findTVSeries(app)
    findTVSeriesCredits(app)
}

module.exports = setTVSeriesBackend;