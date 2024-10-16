const { get, post } = require('../../axios/axiosWrapper')
const { getShareToken } = require('./auth');
const { sleep } = require('../utils')
const { searchMulti } = require('../../tmdbAPIs/tmdbAPI')

const isVideo = (name) => {
    const ends = ['mp4', 'mkv', 'avi', 'ts']
    return ends.some(end => name.endsWith(end))
}

const crawledSet = new Set()

const list_by_shareUrl = 'https://api.aliyundrive.com/adrive/v2/file/list_by_share';

const maxLayer = 10

function intersection(arr1, arr2) {
    return arr1.filter(value => arr2.includes(value))
}

function isRelated(name, titleObj) {
    const nameArray = Array.from(name)
    const { title, original_title } = titleObj
    const titleArray = Array.from(title)
    const originalTitleArray = Array.from(original_title)

    const titleRelated = intersection(nameArray, titleArray)
    const originalTitleRelated = intersection(nameArray, originalTitleArray)

    // console.log(titleRelated, originalTitleRelated)

    return titleRelated.length >= titleArray.length / 2 || originalTitleRelated.length >= originalTitleArray.length / 2
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

async function findVideo(titleObj, shareObj, parent_file_id, parentName, layer, nameList = [], taskManager) {
    const { share_id, share_token } = shareObj
    if (taskManager && taskManager.canceled) {
        return false
    }
    if (layer == maxLayer) {
        crawledSet.add(share_id)
        return false
    }
    if (crawledSet.has(share_id)) {
        return false
    }
    await sleep()
    const data = {
        share_id,
        parent_file_id
    }
    const shareHeaders = {
        headers: {
            'x-share-token': share_token
        }
    }
    try {
        const res = await post(list_by_shareUrl, data, shareHeaders)
        if (res && res.items.length > 0) {
            const names = res.items.map(item => item.name)
            if (names.length) {
                const msg = {
                    type: 'getFiles',
                    data: {
                        parent_file_id,
                        parentName,
                        names
                    }
                }
                console.log(msg)
                taskManager.sendSSE(msg)
            }
            console.log('findItems in ', parentName, names)
            for (const child of res.items) {
                console.log('searching', child.name)
                const { parent_file_id, type, name, file_id } = child
                nameList.push(name)
                if (type == 'folder') {
                    const hasVideoInChild = await findVideo(titleObj, shareObj, file_id, name, layer + 1, nameList, taskManager)

                    if (hasVideoInChild) {
                        console.log(`find video in ${name}`)
                        crawledSet.add(share_id)
                        return {
                            file_id: file_id,
                            share_id,
                            name
                        }
                    }
                }

                if (type == 'file' && isVideo(name)) {
                    const related = nameList.some(name => isRelated(name, titleObj))
                    if (related) {
                        console.log(`find video in ${name}`)
                        crawledSet.add(share_id)
                        return {
                            file_id: parent_file_id,
                            share_id,
                            name
                        }
                    }
                }

            }
            if (layer == 0) {
                crawledSet.add(share_id)
            }

            console.log('find no video')
            return false
        } else {
            console.log('findVideo no res', res)
            if (layer == 0) {
                crawledSet.add(share_id)
            }
            return false
        }
    } catch (error) {
        console.log('post findVideo error', error)
        crawledSet.add(share_id)
        return false
    }

}


async function crawlShareLink(shareLink, keywordObj, taskManager) { 
    const { title, original_title } = keywordObj
    const result = await updateShareToken(shareLink)
    if (!result) {
        console.log('updateShareToken is null')
        return false
    }
    const {
        share_id,
        share_token,
        share_pwd
    } = result
    if (share_id && share_token) {
        const findVideoRes = await findVideo({ title, original_title }, { share_id, share_token }, 'root', 'root', 0, [], taskManager)
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
    get('https://iflight.eatuo.com:30125/flightQuery?flightNumber=GS7588').then( res => {
        console.log(res)
    })
}

test()

module.exports = {
    updateShareToken,
    crawlShareLink
}