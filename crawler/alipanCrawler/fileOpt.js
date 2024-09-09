const axios = require('axios');
const { get, post } = require('../axios/axiosWrapper')
const { getAccessToken, readAccessToken } = require('./auth');
axios.defaults.headers.common['user-agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0'
axios.defaults.headers.common['Content-Type'] = 'application/json'
const fileHeaders = {
    headers: {
        'x-share-token': '',
        'authorization': ''
    }
}

const to_drive_id = '1911860630'

let authorization = null

const readSavedAccessToken = async () => {
    if (authorization) {
        return authorization
    }
    else {
        const path = '/Users/hujiayou/.aligo/aligo.json'
        const accessToken = await readAccessToken(path);
        authorization = `Bearer ${accessToken}`
        return authorization
    }
}



let tryNum = 0

axios.interceptors.request.use(
    async (config) => { 
        return config
    }
)
axios.interceptors.response.use(
    async (response) => { 
        return response
    },
    async (error) => {
        const { config, response } = error
        console.log(response)
        const code = response?.data?.code
        if (tryNum < 3) {
            tryNum++
            if (code == 'AccessTokenInvalid') {
                const accessToken = await getAccessToken();
                authorization = `Bearer ${accessToken}`
                config.headers['Authorization'] = `Bearer ${accessToken}`
                return axios(config)
            }
        } else {
            tryNum = 0
            console.log(error)
        }
    }
)

const batchOptUrl = "https://api.aliyundrive.com/adrive/v4/batch"

const share_file_save_all_to_drive = async (shareInfo, fileInfo) => {
    const authorization = await readSavedAccessToken()
    const { share_id, share_token } = shareInfo
    const { file_id, to_parent_file_id } = fileInfo 
    console.log('share_file_save_all_to_drive', share_id, '\n', file_id, '\n', to_parent_file_id)
    const body = {
        auto_rename: true,
        file_id,
        to_drive_id,
        share_id,
        to_parent_file_id
    }
    const postData = {
        "requests": [
            {
                body,
                "headers": {
                    "Content-Type": "application/json"
                },
                "id": "0",
                "method": "POST",
                "url": "/file/copy"
            }
        ],
        "resource": "file"
    }
    const fileHeaders = {
        headers: {
            'x-share-token': share_token,
            'authorization': authorization
        }
    }
    const saveResult = await post(batchOptUrl, postData, fileHeaders)
    console.log('save', body, saveResult)
    return saveResult
}

// share_file_save_all_to_drive({
//     share_id: 'DGNuiQrSfEo',
//     share_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21Kc29uIjoie1wiZG9tYWluX2lkXCI6XCJiajI5XCIsXCJzaGFyZV9pZFwiOlwiREdOdWlRclNmRW9cIixcImNyZWF0b3JcIjpcIjZmNjU1Njg4M2VkMTQ2NjVhNDE3NjBhYTE2MmMxODVjXCIsXCJ1c2VyX2lkXCI6XCJhbm9ueW1vdXNcIn0iLCJjdXN0b21UeXBlIjoic2hhcmVfbGluayIsImV4cCI6MTcyNTYyMDc3OSwiaWF0IjoxNzI1NjEzNTE5fQ.qqHkcugwxg-uhBN5KKZ7nO701BOrMR_EXychsClciHxb_2a5nw_KjYAnS5qN_9mdQ2zoKxrpefYqZ5Ys4eUrWMZnZjU8u3jb15aQ9uBHFQcYMCW3E1K6ztOSJlvDSy9fESP8KNPHGRnAEpKizjqoxM4GEDCcL0tUaQkXsKbHgls'
// }, {
//     file_id: '66d4557e99b9c5affdd64415ace39b85509e3187',
//     to_parent_file_id: '66daa2b88fd8e427f1804b2b87b0cc57f069e7ac'
// })

// 获取文件列表
const getFolderItems = async (parent_file_id) => {
    const url = 'https://api.aliyundrive.com/adrive/v3/file/list'
    const params = {
        jsonmask: 'next_marker,items(name,file_id,drive_id,type,size,created_at,updated_at,category,file_extension,parent_file_id,mime_type,starred,thumbnail,url,streams_info,content_hash,user_tags,user_meta,trashed,video_media_metadata,video_preview_metadata,sync_meta,sync_device_flag,sync_flag,punish_flag'
    }
    const config = {
        headers: {
            authorization
        },
        params
    }
    const data = {
        drive_id: to_drive_id,
        parent_file_id
    }
    const response = await post(url, data, config)
    return response.items

}

// 删除文件夹下的所有文件
const deleteFiles = async (items) => {
    const requests = items.map(({ file_id }) => {
        return {
            "body": {
                "file_id": file_id,
                "drive_id": to_drive_id
            },
            "headers": {
                "Content-Type": "application/json"
            },
            "id": file_id,
            "method": "POST",
            "url": "/file/delete"
        }
    })
    console.log('requests', requests)
    const data = {
        requests,
        "resource": "file"
    }
    const headers = {
        headers: {
            authorization
        }
    }
    const deleteResponse = await post(batchOptUrl, data, headers)
    console.log('deleteResponse', deleteResponse)
}
 

module.exports = {
    share_file_save_all_to_drive
}
