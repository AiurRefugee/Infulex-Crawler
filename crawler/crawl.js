const fs = require('fs')
const { extractFilmName, extractUrl, sleep } = require('./utils.js')
const { 
    crawlKeywords
} = require('./tmdbCrawler/tmdbCrawl.js')   

const file = fs.readFileSync('./keywords/filmRecource.txt', 'utf-8')
const names = file.split('\n').slice(0, 100)

async function crawl() {
    for (const item of names) {
        const filmName = extractFilmName(item)
        const filmUrl = extractUrl(item)
        if (filmName && filmUrl) {
            await crawlKeywords(filmName, filmUrl)
            await sleep(20)
        }
    }
}

crawl()