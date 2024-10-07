import axios from 'axios';

const maxRetryCount = 3
let retryCount = 0;

// 超时时间30s
axios.defaults.timeout = 30 * 1000;

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWJjMzI3ZTM3NDU4NzIyZmNkY2E1M2VkMWY2NTY0MCIsInN1YiI6IjY1ZTAwN2Q4NTFmOTlhMDE4NTU2NDVmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xrSqnf1-Vs9LHEZ9bCZRSScOjyBkD1rvDs3OqkzSBYM'


// 公共请求头 
const config = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
}

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
        }

        // 如果不符合重试条件或者已经重试了指定次数，直接返回错误
        console.log('network Error') 
        //   return Promise.reject(error);
    }
);

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params, config)
            .then(
                res => {
                    resolve(res.data);
                },
                err => {
                    console.log(err)
                    reject(err)
                }
            )
            .catch(error => {
                console.log(error)
                reject(error)
            });
    });
}

export function get(url, params) {
    const getConfig = {
        ...config,
        params
    }
    return new Promise((resolve, reject) => {
        axios
            .get(url, getConfig)
            .then(
                res => {
                    if (res && res.data) {
                        resolve(res.data);
                    } else {
                        console.log(res)
                    }
                    
                },
                err => {
                    console.log(err)
                    reject(err)
                }
            )
            .catch(error => {
                console.log(error)
                reject(error)
            });
    });
}