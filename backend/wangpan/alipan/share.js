const { get, post } = require('../../axios/axiosWrapper')
const { sleep } = require('../../utils/index.js')
const EventManager = require('../../classes/eventManager.js')


const isVideo = (item) => {
    const ends = ['mp4', 'mkv', 'avi', 'ts']
    return ends.some(end => item?.name.endsWith(end))
}

const crawledSet = new Set()

const list_by_shareUrl = 'https://api.aliyundrive.com/adrive/v2/file/list_by_share';

const maxLayer = 10

// 获取分享信息
const getShareCode = async (shareLink) => {
    const getSharePwdUrl = `https://api.aliyundrive.com/adrive/v2/share_link/extract_code`
    const response = await post(getSharePwdUrl, {
        content: shareLink
    })
    console.log('getShareCode', response)
    if (response?.data) {
        const { share_id, share_pwd } = response?.data
        return {
            share_id,
            share_pwd
        }
    } else {
        return false
    }


}


// 获取shareToken
const getShareToken = async (share_id, share_pwd) => {
    const getShareTokenUrl = `https://api.aliyundrive.com/v2/share_link/get_share_token`
    const data = await post(getShareTokenUrl, {
        share_id,
        share_pwd
    })
    console.log('getShareToken', data?.share_token)
    const share_token = data?.share_token
    if (share_token) {
        return {
            share_token,
            share_id,
            share_pwd
        }
    }
    return false
}

const getFolderDetail = async (share_id, share_token, parent_file_id) => {
    const data = {
        share_id,
        parent_file_id
    }
    const shareHeaders = {
        headers: {
            'x-share-token': share_token
        }
    }
    console.log('getFolderDetail params', share_id, share_token, parent_file_id)
    const folder = await post(list_by_shareUrl, data, shareHeaders)
    console.log('getFolderDetail', folder)
    return folder?.items

}

const travelFolder = async (topicId, share_id, share_token, parent_file_id, layer = 1) => {
    if (layer > maxLayer) {
        return
    }
    const eventManager = new EventManager()
    getFolderDetail(share_id, share_token, parent_file_id).then(res => {
        if (res?.length) {
            const type = res.some(isVideo) ? 'GET Video' : 'GET Files'
            const time = new Date()
            eventManager.addMsg(topicId, {
                type,
                data: res,
                time: time.toLocaleString()
            })
            res.forEach(child => {
                if (child.type === 'folder') {
                    travelFolder(topicId, share_id, share_token, child.file_id, layer + 1)
                } else if (child.type === 'file') {
                    console.log('child', child)
                }
            })
        } 
    }).catch(err => {
        console.log('getFolderDetail err', err)
    })
}

const crawlLink = async (topicId, link) => {
    getShareCode(link).then(res => {
        console.log('getShareCode', res)
        const { share_id, share_pwd } = res
        getShareToken(share_id, share_pwd).then(res => {
            const { share_token } = res
            travelFolder(topicId, share_id, share_token, 'root')
        })
    }).catch(err => {
        console.log('err', err)
    }
    )
}

async function test() {
    crawlLink('tv_94605', 'https://www.alipan.com/s/KrHZo7Eqkhx')
}

// test()

const alipanApi = {
    getShareToken,
    getFolderDetail,
    travelFolder,
    crawlLink
}

module.exports = alipanApi