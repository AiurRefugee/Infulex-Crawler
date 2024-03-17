const {
    thresholdNum
} = require('./crawlConfig.js');

const filmDataBase = './data/filmPosters/'
const actorDataBase = './data/actorPosters/'
const filmImageDatabase = './data/filmImages/'

const {
    insertObject,
} = require('./mongodbAPIs/film.js')

const Crawler = require("crawler");
const fs = require('fs');
const { resolve } = require('path');

const keyword = '复仇者联盟'
const baseUrl = 'https://www.themoviedb.org/'

const fl = 'https://www.themoviedb.org/movie/299534?language=zh-CN'

var c = new Crawler({
    maxConnections: 100000,
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            console.log($("title").text());
        }
        done();
    }
});

var mediaCrawer = new Crawler({
    maxConnections: 1000,
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

async function crawl(url) {
    return new Promise((resolve, reject) => {
        c.queue({
            uri: url,
            callback: function (error, res, done) {
                if (error) {
                    console.log(error);
                    reject(error)
                } else {
                    const $ = res.$
                    resolve($)
                }
                done()
            }
        })
    })
}

async function searchFilm(keyword, year) {
    let $
    if (year) {
        $ = await crawl(`${baseUrl}/search?language=zh-CN&query=${encodeURI(keyword + ' y: ' + year)}`)
    } else {
        $ = await crawl(`${baseUrl}/search?language=zh-CN&query=${encodeURI(keyword)}`)
    } 
    const elements = Array.from($('.wrapper .title a')).slice(0, 7)
    for (const element of elements) {
        const filmXianguiUrl = $(element).attr('href')
        const filmUrl = new URL(filmXianguiUrl, baseUrl).href
        crawlFilm(filmUrl, resolve)
    }
    
}

// 电影信息
async function crawlFilm(filmUrl, resCallback) {
    if (!filmUrl) {
        return false
    }
    const $ = await crawl(filmUrl)
    const posterDom = $('.image_content > div > img')
    const filmName = $('.title h2 a').text().replace(/[\s\/\\]/g, " ");
    console.log(filmName);
    const filmPosterXiangduiUrl = posterDom.attr('src')
    const filmPosterUrl = new URL(filmPosterXiangduiUrl, baseUrl).href
    if (filmPosterUrl) {
        mediaCrawer.queue({
            title: `filmPoster  ${filmName}`,
            uri: filmPosterUrl,
            filename: filmDataBase + `${filmName}.jpg`
        });
    } else {
        console.log(filmName, 'crawl Film Poster Failed')
    }
    crawlFilmImage(filmName, filmUrl)
    const castList = []
    $('#cast_scroller > ol > li.card').each((index, element) => {
        const actorPosterUrl = $(element).find('img').attr('src')
        const actorName = $(element).find('p a').text().replace(/[\s\/\\]/g, " ");
        const charactor = $(element).find('.character').text().replace(/[\s\/\\]/g, " ");
        castList.push({
            actorName,
            charactor
        })
        if (actorPosterUrl) {
            mediaCrawer.queue({
                title: `actorPoster ${actorName}`,
                uri: actorPosterUrl,
                filename: actorDataBase + `${actorName}.jpg`
            });
        } else {
            console.log(actorName, 'crawl Actor Poster Failed')
        }
    })

    const releaseDate = $('.release').text().replace(/[\s\/\\]/g, " ");
    const pg = $('.certification').text().replace(/[\s\/\\]/g, " ");
    const duration = $('.runtime').text().replace(/[\s\/\\]/g, " ");
    const tags = []
    $('.genres a').each((index, element) => {
        tags.push($(element).text())
    })
    const presentation = $('.overview p').text()

    const film = {
        filmName,
        presentation,
        tags,
        castList,
        pg,
        duration,
        releaseDate,
        addTime: new Date()
    }
    if (filmName) { insertObject(film) }
    resCallback()


}

async function crawlFilmImage(filmName, filmUrl) {
    const urlParts = filmUrl.split('?')
    const imagePage = `${urlParts[0]}/images/backdrops?language=zh-CN`
    c.queue({
        uri: imagePage,
        callback: (error, res, done) => {
            if (error) {
                console.log(error)
            } else {
                const $ = res.$
                const srcset = $('.results img').attr('srcset')
                if (srcset) {
                    const imageUrl = srcset.split(',')[1]
                    mediaCrawer.queue({
                        title: `filmImage     ${filmName}`,
                        uri: imageUrl,
                        filename: filmImageDatabase + `${filmName}.jpg`
                    })
                }
                done()

            }
        }
    })
}

module.exports = {
    searchFilm
}