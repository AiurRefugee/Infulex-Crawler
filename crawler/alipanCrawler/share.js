const { get, post } = require('../axios/axiosWrapper')
const { getShareToken } = require('./auth');

const isVideo = (name) => {
    const ends = ['mp4', 'mkv', 'avi', 'ts']
    return ends.some(end => name.endsWith(end))
}

const list_by_shareUrl = 'https://api.aliyundrive.com/adrive/v2/file/list_by_share';

const maxLayer = 10

function isRelated(stringA, stringB) {
    const setA = new Set(Array.from(stringA));
    const setB = new Set(Array.from(stringB))
    const intersection = []
    for (let item of setB) {
        if (setA.has(item)) {
            intersection.push(item);
        }
    }
    return intersection.length >= stringB.length / 2;
}

const updateShareToken = async (shareLink) => {
    const response = await getShareToken(shareLink);
    if (response) {
        const {
            share_id,
            share_token,
            share_pwd
        } = response
        return {
            share_id,
            share_token,
            share_pwd
        }
    } else {
        return false
    }

}

async function findVideo(keyword, share_id, share_token, parent_file_id, layer) {

    if (layer == maxLayer) return false
    let relatedFilesNum = 0
    const data = {
        share_id,
        parent_file_id
    }
    const shareHeaders = {
        headers: {
            'x-share-token': share_token
        }
    }
    const res = await post(list_by_shareUrl, data, shareHeaders)
    if (res && res.items.length > 0) {
        let relatedNum = 0
        for (const child of res.items) {
            const { parent_file_id, type, name, file_id } = child
            let hasVideo = null, hasVideoInChild = null, videoRes = null
            if (type == 'folder') {
                hasVideoInChild = await findVideo(keyword, share_id, share_token, file_id, layer + 1) 
            }
            if (type == 'file') {
                hasVideo = isVideo(name)
            }

            if (hasVideoInChild) {
                console.log(`find video in ${name}`)
                if (isRelated(name, keyword)) {
                    relatedNum += hasVideoInChild.relatedNum
                }
                return {
                    file_id: file_id,
                    share_id,
                    name,
                    relatedNum
                }
            }
            if (hasVideo) {
                if (isRelated(name, keyword)) {
                    relatedNum += 1
                }
                console.log(`find video in ${name}`)
                return {
                    file_id: parent_file_id,
                    share_id,
                    name,
                    relatedNum
                }
            }
        }
        return false
    } else {
        return false
    }

}

async function crawlShareLink(shareLink) {
    const result = await updateShareToken(shareLink)
    if (!result) {
        return false
    }
    const {
        share_id,
        share_token,
        share_pwd
    } = result
    if (share_id && share_token) {
        const findVideoRes = await findVideo(share_id, share_token, 'root', 0)
        const {
            file_id,
            name
        } = findVideoRes
        console.log('findVideoRes', findVideoRes)
        if (findVideoRes && findVideoRes.file_id) {
            return {
                file_id,
                name,
                share_token,
                share_pwd,
                share_id
            }
        } else {
            false
        }

    } else {
        return false
    }
}

async function test() {
    const res = await findVideo('流浪地球', 'hVAgTmqUELD', `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21Kc29uIjoie1wiZG9tYWluX2lkXCI6XCJiajI5XCIsXCJzaGFyZV9pZFwiOlwiaFZBZ1RtcVVFTERcIixcImNyZWF0b3JcIjpcImIyOTVmMTFkMTE0ZTRkM2U5ZTI0NjVlMzE5YWE1ZjhhXCIsXCJ1c2VyX2lkXCI6XCJhbm9ueW1vdXNcIn0iLCJjdXN0b21UeXBlIjoic2hhcmVfbGluayIsImV4cCI6MTcyNTg5NTUzNiwiaWF0IjoxNzI1ODg4Mjc2fQ.Je8xdTbjLBecPPAeXKam7w1Cb0vPZ4Cnm2JMsZxzUmmHVbtZWmun1PMlp-JiJNBQ-w6TvELBBQNKyeSQSA07a2rn2ps1SNlrvCbu-hJyxd8aG1tUajJokWZp4sp6-VHqIu-6DTbqpDIHKTDFuk_MSpWycVtgfeFp7_PpNByyH_4`, 'root', 0)
    console.log(res)
}

// test()

module.exports = {
    updateShareToken,
    crawlShareLink
}