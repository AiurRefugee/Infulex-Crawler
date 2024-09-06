const express = require('express');
const bodyParser = require('body-parser');

const setMovieBackend = require('./movie.js')
const setTVSeriesBackend = require('./TVSeries.js')
const setTVSeriesSeasonBackend = require('./TVSeason.js')
const setTVEpisodeBackend = require('./TVEpisode.js')


const app = express();
const port = 3000; // 指定应用程序监听的端口号

// 使用 body-parser 中间件解析 POST 请求的请求体
app.use(bodyParser.json());

setMovieBackend(app)
setTVSeriesBackend(app)
setTVSeriesSeasonBackend(app)
setTVEpisodeBackend(app)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
