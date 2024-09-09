const axios = require('axios')
const Crawler = require('crawler')
const { get, post } = require('../axios/axiosWrapper')
const { getAiqiyiVideoList } = require('../aiQiYiCrawler/index')
const { crawlShareLink } = require('../alipanCrawler/share')
const { share_file_save_all_to_drive } = require('../alipanCrawler/fileOpt')
const { sleep } = require('../utils')

const c = new Crawler()

// const QRCode = require('qrcode');

// 生成二维码
// QRCode.toDataURL('https://www.example.com', function(err, url) {
//   if (err) console.error(err)
//   console.log(url) // 打印出DataURL
// });

const topN = 20
const baseUrl = 'https://pan666.net/api/discussions'


// 获取discuss中的阿里云盘链接
const getLinks = async (url) => {
    return new Promise(async (resolve, reject) => {
        const linkSet = new Set()
        c.queue({
            uri: url,
            callback: async function (error, res, done) {
                if (error) { 
                    reject(error)
                } else { 
                    const $ = res.$
                    $('a').each((index, item) => {
                        const href = $(item).attr('href')
                        if (href && href.includes('alipan') || href.includes('aliyundrive')) {
                            linkSet.add(href)
                        }
                    })
                    resolve(linkSet)
                }
                done()
            }

        })
    })
}


// 网盘小站搜索关键字，获取前topN个discuss
const crawlKeyWord = async (keyword, to_parent_file_id) => {
    console.log('crawling', keyword)
    const discusses = await get(baseUrl, {
        'include': 'user,lastPostedUser,mostRelevantPost,mostRelevantPost.user,tags,tags.parent,firstPost',
        'filter[q]': keyword,
        'page[offset]': 0
    })
    const topNDiscuss = discusses.data.slice(0, topN)
    for (const link of topNDiscuss) {
        const slug = link.attributes.slug
        const nextLink = 'https://pan666.net/d/' + slug
        const links = await getLinks(nextLink) 
        for (const link of links) {
            console.log('getLink', link)
            const response = await crawlShareLink(link)
            await sleep(1000)
            if (response) {
                const { share_id, file_id, share_token, name } = response
                console.log('find_video', share_id, file_id, share_token, name)
                share_file_save_all_to_drive({ share_id, share_token }, { file_id, to_parent_file_id })

                return true
            }
        }
        await sleep(5000)
    }
    console.log(`前${topN}个讨论里没有找到可用的链接`)
    return false


}

const crawlAiqiyi = async () => {
    // const keywordList = await getAiqiyiVideoList()
    // for (const keyword of keywordList) {
    //     crawlKeyWord(keyword)
    //     await sleep()
    // }
    // 全部文件>爱奇艺
    const aiqiyi_file_id = '66daa2b88fd8e427f1804b2b87b0cc57f069e7ac'
    const keyWord = '四方馆'
    crawlKeyWord(keyWord, aiqiyi_file_id)
}

const crawlFilm = async () => {
    const keyWord = '毒液：致命守护者'
    const film_file_id = '66dd9ddff876186cb0b24b2fb3c3faac69213eba'
    crawlKeyWord(keyWord, film_file_id)
}

// crawlAiqiyi()
crawlFilm()