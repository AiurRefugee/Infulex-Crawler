const { sleep } = require('../../utils/index.js')
const EventManager = require('../../classes/eventManager.js')
const alipanApi = require('./share.js')
const crawlerConfig = require('../../config/crawler')
const { alipanInterval, maxLayer } = crawlerConfig
const { getShareCode, getShareToken, getFolderDetail, isVideo } = alipanApi

class alipanProxy {
    constructor() {
        if (alipanProxy.instance) {
            return alipanProxy.instance;
        }
        this.eventManager = new EventManager();
        this.requestSequence = []
        this.crawling = false
        alipanProxy.instance = this
    }
    queueLink(topicId, link) {
        const param = {
            type: 'link',
            topicId,
            link
        }
        this.requestSequence.push(param)
        this.startCrawl()
    }

    queueFile(link, topicId, share_id, share_token, parent_file_id, layer) {
        const param = {
            type: 'file',
            topicId,
            share_id,
            share_token,
            parent_file_id,
            layer,
            link
        }
        this.requestSequence.push(param)
    }

    async startCrawl() {
        this.crawling = true
        while (this.requestSequence.length > 0) {
            const task = this.requestSequence.shift()
            const type = task.type
            if (type === 'link') {
                const { topicId, link } = task
                this.crawlLink(topicId, link)
            }
            if (type === 'file') {
                const { link, topicId, share_id, share_token, parent_file_id, layer } = task
                this.travelFolder(link, topicId, share_id, share_token, parent_file_id, layer)

            }
            await sleep(alipanInterval)

        }
        this.crawling = false
    }

    crawlLink(topicId, link) {
        getShareCode(link).then(res => {
            console.log('getShareCode', res)
            const { share_id, share_pwd } = res
            getShareToken(share_id, share_pwd).then(res => {
                const { share_token } = res
                if (share_token) {
                    this.queueFile(link, topicId, share_id, share_token, 'root', 1)
                } else {
                    console.log('no share_token')
                    this.eventManager.addMsg(topicId, {
                        type: 'Share_Token Error',
                        data: [link],
                        msg: "GET share_token failed",
                        time: new Date().toLocaleString()
                    })
                }
                
            }).catch(err => {
                console.log('getShareToken err', err)
            }
            )
        }).catch(err => {
            console.log('err', err)
        }
        )
    }

    travelFolder(link, topicId, share_id, share_token, parent_file_id, layer = 1) {
        if (layer > maxLayer) {
            return
        }
        getFolderDetail(share_id, share_token, parent_file_id).then(res => {
            if (res?.length) {
                const type = res.some(isVideo) ? 'GET Video' : 'GET File'
                const time = new Date()
                this.eventManager.addMsg(topicId, {
                    type,
                    data: res,
                    link,
                    time: time.toLocaleString()
                })
                res.forEach(child => {
                    if (child.type === 'folder') {
                        this.queueFile(link, topicId, share_id, share_token, child.file_id, layer + 1)
                    } else if (child.type === 'file') {
                        console.log('child', child)
                    }
                })
            }
        }).catch(err => {
            console.log('getFolderDetail err', err)
        })
    }



}

module.exports = alipanProxy