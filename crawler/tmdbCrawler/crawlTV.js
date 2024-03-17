const {
    getTVDetail,
    getTVCredits,
    getTVImages, 
} = require('../tmdbAPIs/tmdbAPI.js') 

const {
    init, 
    insertToCollection,
    setMeidaImages,
    setMediaAliUrl
} = require('../mongodbAPIs/tmdb.js')
 
const {
    colletionsNames
} = require('../mongodbAPIs/basic.js')

const { 
    TVSeriesCollectionName,
    TVSeriesCreditsCollectionName
} = colletionsNames

const { 
    crawlImage,
    filterTVCredits, 
    filterImages,
    crawlMediaCredits,
    crawlMediaImages,
} = require('./tmdbUtils.js')

const {
    crawlTVSeason
} = require('./crawlTVSeason.js')

async function crawlTVseries(TVseriesId, aliurl) {
    await init()
    crawlTVseriesDetail(TVseriesId, aliurl)
    crawlTVseriesCredits(TVseriesId)
    crawlTVseriesImages(TVseriesId)
}

async function crawlTVseriesDetail(TVseriesId, aliurl) {
    const TVseriesData = await getTVDetail(TVseriesId)
    if (TVseriesData) { 
        console.log(TVseriesData.name)
        const withDate = {
            ...TVseriesData,
            date: new Date()
        }
        insertToCollection(TVSeriesCollectionName , withDate)
        setMediaAliUrl(TVSeriesCollectionName, TVseriesId, aliurl) 
        const posterUrl = TVseriesData.poster_path
        crawlImage(posterUrl) 
        const number_of_seasons = TVseriesData.number_of_seasons
        for (let seasonNumber = 1; seasonNumber <= number_of_seasons; seasonNumber++) {
            crawlTVSeason(TVseriesId, seasonNumber)
        }
    }
}

async function crawlTVseriesCredits(TVseriesId) {
    const credits = await crawlMediaCredits(
        [TVseriesId], 
        filterTVCredits, 
        crawlImage, 
        getTVCredits
    ) 
    insertToCollection(TVSeriesCreditsCollectionName, {
        _id: TVseriesId,
        credits: credits
    })
}

async function crawlTVseriesImages(TVseriesId) {
    const images = await crawlMediaImages(
        [TVseriesId],
        filterImages,
        crawlImage,
        getTVImages, 
    )
    setMeidaImages(TVSeriesCollectionName , TVseriesId, images)
}

// crawlTVseries(105248, 'test')


module.exports = {
    crawlTVseries
}