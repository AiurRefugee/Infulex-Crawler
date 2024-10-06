const { get, post } = require('../axios/axiosWrapper')
const Crawler = require('crawler')
const c = new Crawler()

const fs = require('fs') 
const url = 'https://pan666.net/d/291798-si-fang-guan-2024'

c.queue({
    uri: url,
    callback: function (error, res, done) {
        if (error) {
            console.log(error)
        } else {
            var $ = res.$
            $('a').each( (index, item) => {
                const href = $(item).attr('href')
                console.log(href)
            })
        }
        done()
    }

})