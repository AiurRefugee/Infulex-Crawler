const {
    getTVSeasonDetail,
    getTVSeasonCredits,
    getTVSeasonImages,
} = require('../../tmdbAPIs/tmdbAPI.js')

const {
    insertToCollection,
    setMeidaImages,
    init, 
} = require('../../mongodbAPIs/tmdb.js')

const {
    colletionsNames
} = require('../../mongodbAPIs/basic.js')

const { 
    TVSeasonCollectionName,
    TVSeasonCreditsCollectionName
} = colletionsNames

const {
    crawlImage,
    filterTVCredits,
    filterImages,
    crawlMediaCredits,
    crawlMediaImages,
} = require('./tmdbUtils.js')

const { crawlTVEpisode } = require('./crawlTVEpisode.js')

async function crawlTVSeason(TVseriesId, seasonNumber) {
    await init()
    const detail = await crawlTVSeasonDetail(TVseriesId, seasonNumber)
    const seasonId = detail.id
    crawlTVSeasonCredits(TVseriesId, seasonNumber, seasonId)
    crawlTVSeasonImages(TVseriesId, seasonNumber, seasonId)
}

async function crawlTVSeasonDetail(TVseriesId, seasonNumber) {
    const TVSeasonData = await getTVSeasonDetail(TVseriesId, seasonNumber)
    console.log(TVSeasonData.name)
    if (TVSeasonData) {
        insertToCollection(TVSeasonCollectionName, TVSeasonData)
        const posterUrl = TVSeasonData.poster_path
        crawlImage(posterUrl)
        const episodes = TVSeasonData.episodes
        for (var episodeNumber = 1; episodeNumber <= episodes.length; episodeNumber++) {
            crawlTVEpisode(TVseriesId, seasonNumber, episodeNumber)
        }
        return TVSeasonData
    }
}

async function crawlTVSeasonCredits(TVseriesId, seasonNumber, seasonId) {
    const credits = await crawlMediaCredits(
        [TVseriesId, seasonNumber],
        filterTVCredits,
        crawlImage,
        getTVSeasonCredits,
    )
    insertToCollection(
        TVSeasonCreditsCollectionName,
        {
            _id: seasonId,
            credits: credits,
        })

}

async function crawlTVSeasonImages(TVseriesId, seasonNumber, seasonId) {
    const images = await crawlMediaImages(
        [TVseriesId, seasonNumber],
        filterImages,
        crawlImage,
        getTVSeasonImages,
    )
    setMeidaImages(TVSeasonCollectionName, seasonId, images)
}

// crawlTVSeason(105248, 1)

module.exports = {
    crawlTVSeason,
}