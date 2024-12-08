import { get, post } from './axiosWrapper.js'
const apiPrefix = '/api'

const createTask = async (mediaType, mediaId, title, backdropPath) => {
    console.log('createTask', mediaType, mediaId, title, backdropPath)
    const taskObj = { 
        mediaId,
        mediaType,
        backdropPath,
        title
    }
    const createResult = await post(apiPrefix + '/createTask', taskObj)
    return createResult

}

const getTaskList = async () => {
    const url = apiPrefix + '/getTaskList'
    const taskList = await get(url)
    console.log('getTaskList', taskList)
    return taskList
}

const getTaskDetail = async (mediaType, mediaId) => {
    const url = apiPrefix + '/getTaskDetail'
    const media_id = Number(mediaId)
    const taskDetail = await post(url, { mediaType, mediaId: media_id })
    console.log('getTaskDetail', taskDetail)
    return taskDetail?.data
}

export const taskApi = {
    createTask,
    getTaskList,
    getTaskDetail
}