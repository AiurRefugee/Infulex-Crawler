

const tmdb = require('../mongodbAPIs/tmdb.js')
const { genres, colletionsNames } = require('../mongodbAPIs/basic.js')

const {
    movieCollectionName,
    movieCreditsCollectionName,
} = colletionsNames

function findMovie(app) {
    app.post('/findFilms', async (req, res) => {
        // 从请求体中获取 POST 请求传递的数据
        const queryObject = req.body;
        // 在控制台输出接收到的数据
        console.log('Received data:', queryObject);

        const results = await tmdb.findFromCollecion(movieCollectionName, queryObject)

        // 做一些处理，例如存储到数据库或者返回给客户端
        // 这里简单地将接收到的数据返回给客户端
        res.json({ message: 'Find Films successfully', data: results });
    });
}

function findMovieCredits(app) {
    app.get('/findMovieCredits', async (req, res) => {
        const query = req.query;
        const movieId = query.movieId
        const credits = await tmdb.findFromCollecion(movieCreditsCollectionName, [{ _id: Number(movieId) }])
        res.json({ message: 'Get Movie Actors successfully', data: credits });
    });
}

function getTopTwenty(app) {
    app.get('/getTopTwenty', async (req, res) => {
        const topMovies = await tmdb.findFromCollecion(
            movieCollectionName,
            [{}],
            (result) => {
                return result.sort({ "item.popularity": -1 }) // -1 表示降序
                    .limit(20) // 限制结果数量为20)
            }

        )
        console.log(topMovies)
        res.json({ message: 'Get Top 20 successfully', data: topMovies });
    })
}

async function getClasses(app) {
    app.get('/getClasses', async (req, res) => {
        const result = []
        for (const genre of genres) {
            const res = await tmdb.findOneFromCollection(
                movieCollectionName,
                [
                    {
                        'item.genres': {
                            $elemMatch: { id: 28 }
                        }
                    }
                ]
            );
            result.push({
                genreId: genre.id,
                genreName: genre.name,
                background: genre.background || `linear-gradient(to right, rgba(214, 55, 34, 0.7) 10%, rgba(130, 22, 126, 0.7) 90%)`,
                ...res
            })
        }
        res.json({ message: 'Get Classes successfully', data: result });
    }) 
}

function setMovieBackend(app) {
    tmdb.init()
    findMovie(app)
    findMovieCredits(app)
    getTopTwenty(app)
    getClasses(app)
}

module.exports = setMovieBackend;