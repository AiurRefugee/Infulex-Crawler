const axios = require('axios')
const fs = require('fs')
const Crawler = require("crawler");

const baseUrl = 'https://wpxz.top/'

const config = {
    headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35'
    }
}

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

c.queue({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35',
    headers: '__51vcke__K7r5x69JaxwZOOJp=2b182445-6031-5a3b-9fc8-97017c0ee29a; __51vuft__K7r5x69JaxwZOOJp=1709084180835; flarum_remember=XgjwASpnsIagb150uSAmC6uRfBF1kIYaeCQp9Snh; cf_clearance=zVt.ubiJHCFEC3MFMXigffeHPXaaqB0B7g0mX6bZjq0-1709257524-1.0-AcvnzD9GTD0Sy2wiM6hTNocPnIyx8BXg/YNNX4ZJFeioG5yF9nZLYrCzj8Y69qDuHOg2UsU6FFoPe4KgEGXrscU=; flarum_session=iu0jAJXuwB9rIAquOB7sTfc7RwyZgIdRoJDIjLZl; __51uvsct__K7r5x69JaxwZOOJp=3; __vtins__K7r5x69JaxwZOOJp={"sid": "3607e858-ff63-5696-8f5a-a50efab0997b", "vd": 2, "stt": 491532, "dr": 491532, "expires": 1709259826636, "ct": 1709258026636}',
    uri: 'https://wpxz.top/?q=%E5%A4%8D%E4%BB%87%E8%80%85%E8%81%94%E7%9B%9F',
    callback: (error, res, done) => {
        if (error) {
            console.log(error)
        } else {
            const $ = res.$
            console.log($("title").text())
            fs.writeFileSync('index.html', $.html())
        }
    }
})


