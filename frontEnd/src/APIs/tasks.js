import { get, post } from './axiosWrapper.js'
const apiPrefix = '/api'

const createTask = async (media, mediaType, backdropPath) => {
    console.log('createTask', media, mediaType, backdropPath)
    const {
        id: mediaId,
        name,
        title, 
    } = media

    const taskObj = { 
        mediaId,
        mediaType,
        backdropPath,
        title: title || name,
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

export const taskApi = {
    createTask,
    getTaskList
}