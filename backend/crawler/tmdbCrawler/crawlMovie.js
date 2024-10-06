const {
    getMovieCredits,
    getMovieDetail,
    getMovieImages, 
} = require('../../tmdbAPIs/tmdbAPI.js')

const {
    crawlImage,
    filterMovieCredits,
    filterImages,
    crawlMediaCredits,
    crawlMediaImages,
} = require('./tmdbUtils.js')

const {
    init,
    insertToCollection,
    setMeidaImages,
    setMediaAliUrl
} = require('../../mongodbAPIs/tmdb.js')

const {
    colletionsNames
} = require('../../mongodbAPIs/basic.js')

const { 
    movieCollectionName,
    movieCreditsCollectionName
} = colletionsNames

async function crawlMovie(movieId, aliurl) {
    await init()
    crawlFilmDetial(movieId, aliurl)
    crawlFilmCredits(movieId)
    crawlFilmImages(movieId)
}


async function crawlFilmDetial(movieId, aliurl) {
    const filmData = await getMovieDetail(movieId)
    if (filmData) {
        console.log(filmData.title)
        const path = filmData.poster_path

        const filmDatWithDate = {
            date: new Date(),
            ...filmData
        }
        crawlImage(path)
        insertToCollection(movieCollectionName, filmDatWithDate)
        setMediaAliUrl(movieCollectionName, aliurl)

    }
}


async function crawlFilmCredits(movieId) {
    const credits = await crawlMediaCredits(
        [movieId],
        filterMovieCredits,
        crawlImage,
        getMovieCredits
    )
    insertToCollection(
        movieCreditsCollectionName, {
            _id: movieId,
            credits: credits
        }
    )
}

async function crawlFilmImages(movieId) {
    const images = await crawlMediaImages(
        [movieId],
        filterImages,
        crawlImage,
        getMovieImages,
    )
    setMeidaImages(movieCollectionName, movieId, images)
}


module.exports = {
    crawlMovie
}