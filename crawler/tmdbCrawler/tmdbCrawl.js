const fs = require('fs') 

const { crawlMovie } = require('./crawlMovie.js')

const { crawlTVseries } = require('./crawlTV.js')

const { searchMulti } = require('../tmdbAPIs/tmdbAPI.js')

async function crawlKeywords(keyword, aliUrl) {
    searchMulti(keyword).then(data => {

        const res = data.results[0]
        if (res && res.id) {
            if (res.media_type === 'movie') {
                crawlMovie(res.id, aliUrl)
            }
            if (res.media_type === 'tv') {
                console.log(res.id)
                crawlTVseries(res.id, aliUrl)
            }
        } else { 
            console.log('no match')
        }
    })
}

module.exports = {
    crawlKeywords
}