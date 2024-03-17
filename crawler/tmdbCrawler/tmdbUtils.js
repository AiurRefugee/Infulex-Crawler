const _ = require('lodash')
const Crawler = require('crawler')
const fs = require('fs')

const imageBaseUrl = 'https://image.tmdb.org/t/p/original'
const dataPath = '/Users/hujiayou/Documents/VScode_Projects/infulex-cralwer/crawler/data'

var mediaCrawer = new Crawler({
    rateLimit: 100,
    encoding: null,
    jQuery: false,// set false to suppress warning message.
    callback: (err, res, done) => {
        if (err) {
            console.error(err);
        } else {
            fs.createWriteStream(res.options.filename).write(res.body);
        }

        done();
    }

})

function filterMovieCredits(credits) {
    if (credits) { 
        const cast = credits.cast
        const actors = cast.slice(0, 20).map(item => ({
            job: 'Actor',
            ...item
        }))
         
        const crew = credits.crew
        const directors = crew.filter(item => item.job === 'Director')
        .map(item => ({
            job: 'Director',
            ...item
        }))
        const writers = crew.filter(item => item.job === 'Writer')
        .map(item => ({
            job: 'Writer',
            ...item
        }))
         
        return [...actors, ...writers, ...directors]
    }
}

function filterTVCredits(credits) {
    if (credits) { 
        const cast = credits.cast
        const actors = cast.slice(0, 20).map(item => ({
            job: 'Voice',
            ...item
        }))
         
        const crew = credits.crew
        const directors = crew.filter(item => item.job.includes('Director'))
        .map(item => ({
            job: 'Director',
            ...item
        }))
        const writers = crew.filter(item => item.job.includes('Designer'))
        .map(item => ({
            job: 'Designer',
            ...item
        }))
        const guest_stars = credits.guest_stars
        var guests = []
        if (guest_stars && guest_stars.length > 0) {
            guests = guest_stars.slice(0, 20)
        }
         
        const creditTemp = [...actors, ...writers, ...directors, ...guests]
        const creditRes = _.uniqBy(creditTemp, 'name')
        return creditRes
    }
}

function filterImages(images) {
    var backdropRes = []
    var posterRes = []
    var stillRes = []
    if (images && images.backdrops) {
        const filteredBackdrop = images.backdrops.filter(item => item.wmediaIdth >= 1920 || item.height >= 1080)
        const backdrops = _.sampleSize(filteredBackdrop, 5)
        backdropRes = backdrops.map(item => ({
            type: 'backdrop',
            ...item 
        }))
    }
    if (images && images.posters) {
        const postersFiltered = images.posters.filter(item => item.wmediaIdth >= 1920 || item.height >= 1080)
        const posters = _.sampleSize(postersFiltered, 5)
        posterRes = posters.map(item => ({
            type: 'poster',
            ...item 
        }))
    }
    if (images && images.stills) {
        const stillsFiltered = images.stills.filter(item => item.wmediaIdth >= 1920 || item.height >= 1080)
        const stills = _.sampleSize(stillsFiltered, 5)
        stillRes = stills.map(item => ({
            type: 'still',
            ...item
        }))
    }
    return [...backdropRes, ...posterRes, ...stillRes]
}

async function crawlMediaCredits(query, filterFunc, crawlFunc, getCreditFunc) {
    const credits = await getCreditFunc(...query)
    const creditsFiltered = filterFunc(credits)
    if (creditsFiltered && creditsFiltered.length) {
        for (const person of creditsFiltered) {
            const name = person.name
            const path = person.profile_path 
            console.log(name)
            crawlFunc(path)
        }
        return creditsFiltered
        
    } else {
        console.log('no credits')
    }
}

async function crawlMediaImages(query, filterFunc, crawlFunc, getImageFunc) {
    const images = await getImageFunc(...query)
    const imagesFiltered = filterFunc(images) 
    if (imagesFiltered && imagesFiltered.length) {
        for (const image of imagesFiltered) {
            crawlFunc(image['file_path'])
        } 
        return imagesFiltered
    } else {
        console.log('no images')
    }
    
}

function crawlImage(path) {
    if (path) {
        const url = imageBaseUrl + path
        mediaCrawer.queue({
            uri: url,
            filename: dataPath + path
        })
    }
}

module.exports = {
    crawlImage,
    filterMovieCredits,
    filterImages,
    filterTVCredits,
    crawlMediaCredits,
    crawlMediaImages
}