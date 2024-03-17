const Crawler = require('crawler')

const { extractFilmName } = require('./utils.js');

const url = 'https://api.aliyundrive.com/adrive/v2/file/list_by_share';


const baseUrl = 'https://www.aliyundrive.com'

const maxTryTimes = 3

// 定义要发送的数据
const data = {
    "share_id": "TV4GMtkRxpZ",
    "parent_file_id": "root",
}

// 定义请求头
const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "content-type": "application/json",
    "x-device-id": "FoNGHhrm8zsBASQOBHlZuysG",
    "x-share-token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21Kc29uIjoie1wiZG9tYWluX2lkXCI6XCJiajI5XCIsXCJzaGFyZV9pZFwiOlwiY001YU1rUE1SQTRcIixcImNyZWF0b3JcIjpcIjY2OTg3MThjMDljYzRhNGFiMzViZDBhYWE2NWZlYThhXCIsXCJ1c2VyX2lkXCI6XCJhbm9ueW1vdXNcIn0iLCJjdXN0b21UeXBlIjoic2hhcmVfbGluayIsImV4cCI6MTcwOTM3NzE1NSwiaWF0IjoxNzA5MzY5ODk1fQ.glkaRMFQaFf1WN6bfCs9C0LeIC3udhpkkewOdrWQR0hMQly8Gu3aAux-EZaQA_73uVTFejKQrJAJgj415QWHr-aQiEV0KIDDyAYYI2I39EjQ7x050otXlp1QDVvkvblg5DdCDmXxFN3rgkAkHU3cov7-fbsQonLeCi9ecFdQSPE"
};

const c = new Crawler({
    rateLimit: 2000, // `maxConnections` will be forced to 1
    maxConnections: 100,
    headers: headers,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            // const $ = res.$;
            // // $ is Cheerio by default
            // //a lean implementation of core jQuery designed specifically for the server
            // console.log($('title').text());
        }
        done();
    }
});




// const { device_id, access_token } = JSON.parse(localStorage.getItem('token'))

// 保存到阿里云盘
// fetch("https://api.aliyundrive.com/adrive/v4/batch", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
//     "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4Y2Q1NzRhZTg5Yzk0YzIyODE0NTdmZmMzNjE0OTYwZCIsImN1c3RvbUpzb24iOiJ7XCJjbGllbnRJZFwiOlwiMjVkelgzdmJZcWt0Vnh5WFwiLFwiZG9tYWluSWRcIjpcImJqMjlcIixcInNjb3BlXCI6W1wiRFJJVkUuQUxMXCIsXCJTSEFSRS5BTExcIixcIkZJTEUuQUxMXCIsXCJVU0VSLkFMTFwiLFwiVklFVy5BTExcIixcIlNUT1JBR0UuQUxMXCIsXCJTVE9SQUdFRklMRS5MSVNUXCIsXCJCQVRDSFwiLFwiT0FVVEguQUxMXCIsXCJJTUFHRS5BTExcIixcIklOVklURS5BTExcIixcIkFDQ09VTlQuQUxMXCIsXCJTWU5DTUFQUElORy5MSVNUXCIsXCJTWU5DTUFQUElORy5ERUxFVEVcIl0sXCJyb2xlXCI6XCJ1c2VyXCIsXCJyZWZcIjpcImh0dHBzOi8vd3d3LmFsaXl1bmRyaXZlLmNvbS9cIixcImRldmljZV9pZFwiOlwiOTMyMmE2MTA0MTVhNGI1YWJkNmVmMzdhZWIyNWM1M2NcIn0iLCJleHAiOjE3MDkxMjYwMDUsImlhdCI6MTcwOTExODc0NX0.g62O7GSWQAsqu3VWZeMxocGL2ju0BjeElwPoSByVFKwck895zt5X1xASzXKk12JhxZYBmxfH7gnvxRCfrNWLXH1LWCcxLtkyu_HrKS6xwoAmK7XWYLSXSLYnzGaj64y1c7kqp85YP77O0pBi1Z4Cr9BzsqqIJgj16vM2FlRs9tA",
//     "content-type": "application/json",
//     "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Microsoft Edge\";v=\"121\", \"Chromium\";v=\"121\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-site",
//     "x-canary": "client=web,app=share,version=v2.3.1",
//     "x-device-id": "FoNGHhrm8zsBASQOBHlZuysG",
//     "x-share-token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21Kc29uIjoie1wiZG9tYWluX2lkXCI6XCJiajI5XCIsXCJzaGFyZV9pZFwiOlwiOXBtQ1loSHZIWGRcIixcImNyZWF0b3JcIjpcImIxNjkxNDRkNDBlYzRhYWRiOTNjM2E4YTRjNjVkNzE2XCIsXCJ1c2VyX2lkXCI6XCJhbm9ueW1vdXNcIn0iLCJjdXN0b21UeXBlIjoic2hhcmVfbGluayIsImV4cCI6MTcwOTEzMjEzMCwiaWF0IjoxNzA5MTI0ODcwfQ.e2L2OJw5tmHiuInpbYW_6sgX1gTxAIEmsVS7bKF6xIorf-ia2TvfM9IYErAO3uLMClyf-99BpNfMozfHsgdYjuBJIyUgjW5TtumVeb9m5fD9c1qH109cVCZr_7yuHRvUyFSI_Cm0rbUqaLl-ugPqBv2YjhrYUeiuCmg5h5stDeY"
//   },
//   "referrer": "https://www.aliyundrive.com/",
//   "referrerPolicy": "origin",
//   "body": "{\"requests\":[{\"body\":{\"file_id\":\"6396dc7582368a2d3f14417491bba6f6a7bd9580\",\"share_id\":\"9pmCYhHvHXd\",\"auto_rename\":true,\"to_parent_file_id\":\"root\",\"to_drive_id\":\"563295941\"},\"headers\":{\"Content-Type\":\"application/json\"},\"id\":\"0\",\"method\":\"POST\",\"url\":\"/file/copy\"}],\"resource\":\"file\"}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });


async function crawlPost(postData, times) {
    return new Promise((resolve, reject) => {
        c.queue({
            uri: url,
            method: 'POST', // 指定请求方法为POST
            jquery: false,
            body: JSON.stringify(postData),
            callback: (error, res, done) => {
                if (error) {
                    console.log(error)
                    reject(error)
                } else {
                    const data = JSON.parse(res.body)
                    if (data.code) {
                        console.log('data', data)
                    }
                    resolve(data)
                    done()
                }
            }
        })
    })

}

async function crawlFolder(reqData, resoultObject) {
    const res = await crawlPost(reqData)
    if (res.items) {
        for (const child of res.items) {
            const { parent_file_id, share_id, type, name, file_id } = child
            if (type == 'folder') {
                const newData = {
                    share_id,
                    parent_file_id: file_id
                }
                await crawlFolder(newData, resoultObject)
            }
            if (type == 'file') {
                if (name.endsWith('mkv') || name.endsWith('mp4')) {
                    const { chinese, filmName, year } = extractFilmName(name)
                    if (filmName && year) {
                        resoultObject[`${filmName} y:${year}`] = { chinese, filmName, file_id, year }
                    }

                }


            }
        }
    }

}

async function crawlRoot(share_id) {
    const data = {
        share_id: share_id,
        'parent_file_id': 'root'
    }
    const result = {}
    await crawlFolder(data, result)
    console.log(result)
    return result
}

crawlRoot('cM5aMkPMRA4')





