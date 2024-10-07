import axios from 'axios';

const maxRetryCount = 3
let retryCount = 0;

// 超时时间30s
axios.defaults.timeout = 30 * 1000;
 

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果响应正常，则直接返回响应
        return response;
    },
    error => {
        const { config, response } = error;

        // 如果响应存在且状态码符合重试条件
        if (retryCount < maxRetryCount) {
            retryCount++;
            console.log(`Retrying request ${config.url}, attempt ${retryCount}`);
            return axios(config); // 重新发起请求
        } else {
            retryCount = 0
        }

        // 如果不符合重试条件或者已经重试了指定次数，直接返回错误
        console.log('network Error') 
        //   return Promise.reject(error);
    }
);

export function post(url, data, config) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, data, config)
            .then(
                res => { 
                    resolve(res?.data);
                },
                err => { 
                    reject(err)
                }
            )
            .catch(error => { 
                reject(error)
            });
    });
}

export function get(url, params, config) {
    const getConfig = {
        ...config,
        params
    }
    return new Promise((resolve, reject) => {
        axios
            .get(url, getConfig)
            .then(
                res => {
                    resolve(res?.data);
                },
                err => {
                    console.log(err?.data)
                    reject(err)
                }
            )
            .catch(error => {
                console.log(error?.data)
                reject(error)
            });
    });
}