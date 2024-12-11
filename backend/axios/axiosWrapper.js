const axios = require('axios');
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Connection'] = 'keep-alive';

axios.interceptors.response.use(
    async (response) => { 
        return response
    },
    async (error) => {
        const { config, response } = error
        console.log('response err', error)
        return response?.data
    }
)

// 超时时间30s
axios.defaults.timeout = 30 * 1000;


function post(url, data, config) {
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
                console.log('post error', error?.data)
                reject(error)
            });
    });
}

function get(url, params, config) {
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
                console.log('get error', error?.data)
                reject(error)
            });
    });
}

module.exports = {
    axios,
    post,
    get
}