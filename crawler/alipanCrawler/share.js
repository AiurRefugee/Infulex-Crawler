const { get, post } = require('../axios/axiosWrapper')
const { getShareToken } = require('./auth');

const isVideo = (name) => {
    const ends = ['mp4', 'mkv', 'avi']
    return ends.some(end => name.endsWith(end))
}

const list_by_shareUrl = 'https://api.aliyundrive.com/adrive/v2/file/list_by_share';

const maxLayer = 4


const updateShareToken = async (shareLink) => {
    const {
        share_id,
        share_token,
        share_pwd
    } = await getShareToken(shareLink);
    return {
        share_id,
        share_token,
        share_pwd
    }
}

async function findVideo(share_id, share_token, parent_file_id, layer) {
    if (layer == maxLayer) return false

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
    if (res.items) {
        for (const child of res.items) {
            const { parent_file_id, type, name, file_id } = child
            let hasVideo = null, hasVideoInChild = null, videoRes = null
            if (type == 'folder') {
                hasVideoInChild = await findVideo(share_id, share_token, file_id, layer + 1)
            }
            if (type == 'file') {
                hasVideo = isVideo(name)
            }
            if (hasVideo || hasVideoInChild) {
                if (hasVideoInChild) {
                    return {
                        file_id: file_id,
                        share_id,
                        name
                    }
                }
                if (hasVideo) {
                    return {
                        file_id: parent_file_id,
                        share_id,
                        name
                    }
                }
                return false
            }
        }
        return false
    } else {
        return false
    }

}

async function crawlShareLink(shareLink) {
    const {
        share_id,
        share_token,
        share_pwd
    } = await updateShareToken(shareLink)
    if (share_id && share_token) {
        const findVideoRes = await findVideo(share_id, share_token, 'root', 0)
        const {
            file_id,
            name
        } = findVideoRes
        console.log(findVideoRes)
        return {
            file_id,
            name,
            share_token,
            share_pwd,
            share_id
        }
    } else {
        return false
    }
}

crawlShareLink('https://www.alipan.com/s/DGNuiQrSfEo')

module.exports = {
    updateShareToken,
    crawlShareLink
}