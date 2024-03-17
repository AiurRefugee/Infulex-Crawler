const {
    getEpisodeDetail,
    getEpisodeCredits,
    getEpisodeImages
} = require('../tmdbAPIs/tmdbAPI.js')

const {
    insertToCollection,
    setMeidaImages,
    init, 
} = require('../mongodbAPIs/tmdb.js') 

const {
    colletionsNames
} = require('../mongodbAPIs/basic.js')

const { 
    TVEpisodeCollectionName,
    TVEpisodeCreditsCollectionName
} = colletionsNames

const { 
    crawlImage,
    filterTVCredits, 
    filterImages,
    crawlMediaCredits,
    crawlMediaImages,
} = require('./tmdbUtils.js')

async function crawlTVEpisode(TVseriesId, seasonNumber, episodeNumber) {
    await init()
    const detail = await crawlTVEpisodeDetail(TVseriesId, seasonNumber, episodeNumber) 
    const seasonId = detail.id
    crawlTVEpisodeCredits(TVseriesId, seasonNumber, seasonId, episodeNumber)
    crawlTVEpisodeImages(TVseriesId, seasonNumber, seasonId, episodeNumber)
}

async function crawlTVEpisodeDetail(TVseriesId, seasonNumber, episodeNumber) {
    const TVEpisodeData = await getEpisodeDetail(TVseriesId, seasonNumber, episodeNumber)
    console.log(TVEpisodeData.name )
    if (TVEpisodeData) {  
        insertToCollection(TVEpisodeCollectionName, TVEpisodeData) 
        const posterUrl = TVEpisodeData.poster_path
        crawlImage(posterUrl) 
        return TVEpisodeData
    }
}

async function crawlTVEpisodeCredits(TVseriesId, seasonNumber, seasonId, episodeNumber) {
    const credits = await crawlMediaCredits(
        [TVseriesId, seasonNumber, episodeNumber], 
        filterTVCredits, 
        crawlImage, 
        getEpisodeCredits,  
    ) 
    insertToCollection(
        TVEpisodeCreditsCollectionName,
        {
            _id: seasonId,
            credits: credits,
        }
    )

}

async function crawlTVEpisodeImages(TVseriesId, seasonNumber, seasonId, episodeNumber) {
    const images = await crawlMediaImages(
        [TVseriesId, seasonNumber, episodeNumber],
        filterImages,
        crawlImage,
        getEpisodeImages, 
    ) 
    setMeidaImages(TVEpisodeCollectionName, seasonId, images)
}

// crawlTVEpisode(105248, 1, 1)

module.exports = {
    crawlTVEpisode,
}