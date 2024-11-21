const Crawler = require('crawler')
const { get, post } = require('../../axios/axiosWrapper.js') 
const { crawlShareLink } = require('../../wangpan/alipan/share.js')
const { sleep } = require('../../utils/index.js')
const EventManager = require('../../classes/eventManager.js')
const c = new Crawler()

const maxPageNum = 1 // 最大页数
const pageSize = 20 // 页大小

// const QRCode = require('qrcode');

// 生成二维码
// QRCode.toDataURL('https://www.example.com', function(err, url) {
//   if (err) console.error(err)
//   console.log(url) // 打印出DataURL
// });

const topN = 20
const baseUrl = 'https://pan666.net/api/discussions'


// 获取discuss中的阿里云盘链接
const getLinksInDiscuss = (url) => {
    return new Promise(async (resolve, reject) => {
        const linkSet = new Set()
        c.queue({
            uri: url,
            callback: async function (error, res, done) {
                console.log('crawling', url)
                if (error) { 
                    reject(error)
                } else { 
                    const $ = res.$
                    $('a').each((index, item) => {
                        const href = $(item).attr('href')
                        if (href && href.startsWith('https://www.alipan.com/s') || 
                            href.startsWith('https://www.aliyundrive.com/s' 
                        )) {
                            linkSet.add(href)
                        }
                    })
                    resolve(Array.from(linkSet))
                }
                done()
            }

        })
    })
}

const crawlLinks = async (links) => {
    if (links.length == 0) return
    const msg = {
        type: 'getLinksInDiscuss',
        data: links
    }
    console.log('msg', msg)
    taskObj && taskObj.sendSSE(msg)
    for (const link of links) {
        console.log('getLink', link)
        crawlShareLink(link, keywordObj, taskObj)
        await sleep(1000)
         
    }
}

// 网盘小站搜索关键字，获取前topN个discuss
const searchKeyword = async (mediaId, mediaType, keywordObj, pageNum = 1) => {
    if (pageNum > maxPageNum) return false
    const topicId = mediaType + '_' + mediaId
    const eventManager = new EventManager()
    const { title, original_title } = keywordObj
    console.log('crawling', title, 'pageNum', pageNum)

    // getDiscusses
    get(baseUrl, {
        'include': 'user,lastPostedUser,mostRelevantPost,mostRelevantPost.user,tags,tags.parent,firstPost',
        'filter[q]': title,
        'page[offset]': (pageNum - 1) * pageSize
    }).then( async discusses => {
        console.log('discusses', discusses)

        for (const link of discusses.data) {
            const slug = link.attributes.slug
            const nextLink = 'https://pan666.net/d/' + slug
            getLinksInDiscuss(nextLink).then(links => {
                console.log('links', links)
                eventManager.addMsg(topicId, links)
            }).catch(err => {
                console.log('getLinksInDiscuss err', err)
            })
            await sleep(3000)
        }
    }).catch(err => {
        console.log('getDiscusses err', err)
    })
    searchKeyword(mediaId, mediaType, keywordObj, pageNum + 1)


}

searchKeyword(94605, 'tv', { title: '英雄联盟：双城之战'}, 1 )
module.exports = {
    searchKeyword
}