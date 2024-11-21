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
    const folder = await post(list_by_shareUrl, data, shareHeaders)
    return folder?.items

}

const travelFolder = async (topicId, share_id, share_token, parent_file_id, layer = 1) => {
    if (layer > maxLayer) {
        return
    }
    const eventManager = new EventManager()
    getFolderDetail(share_id, share_token, parent_file_id).then(res => {
        console.log('res', res)
        const children = res.items
        const type = children.some(isVideo) ? 'GET video' : 'GET files'
        eventManager.addMsg(topicId, {
            type,
            data: children
        })
        children.forEach(child => {
            if (child.type === 'folder') {
                travelFolder(share_id, share_token, child.file_id, layer + 1)
            } else if (child.type === 'file') {
                console.log('child', child)
            }
        })
    }).catch(err => {
        console.log('err', err)
    })
}

const crawlLink = async (topicId, link) => {
    getShareCode(link).then(res => {
        console.log('getShareCode', res)
        const { share_id, share_pwd } = res
        getShareToken(share_id, share_pwd).then(res => {
            console.log('getShareToken', res)
            const { share_token } = res
            travelFolder(topicId, share_id, share_token, 'root')
        })
    }).catch(err => {
        console.log('err', err)
    }
    )
}


// async function crawlShareLink(shareLink, keywordObj) { 
//     const { title, original_title } = keywordObj
//     const result = await updateShareToken(shareLink)
//     if (!result) {
//         console.log('updateShareToken is null')
//         return false
//     }
//     const {
//         share_id,
//         share_token,
//         share_pwd
//     } = result
//     if (share_id && share_token) {
//         const findVideoRes = await findVideo({ title, original_title }, { share_id, share_token }, 'root', 'root', 0, [])
//         const {
//             file_id,
//             name
//         } = findVideoRes
//         console.log('findVideoRes', findVideoRes)
//         if (findVideoRes && findVideoRes.file_id) {
//             return {
//                 file_id,
//                 name,
//                 share_token,
//                 share_pwd,
//                 share_id
//             }
//         } else {
//             false
//         }

//     } else {
//         return false
//     }
// }

async function test() {
    get('https://iflight.eatuo.com:30125/flightQuery?flightNumber=GS7588').then(res => {
        console.log(res)
    })
}

// test()

module.exports = {
    // updateShareToken,
    // crawlShareLink
}