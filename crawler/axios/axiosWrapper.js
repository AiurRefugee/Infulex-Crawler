const axios = require('axios');

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
                console.log(error?.data)
                reject(error)
            });
    });
}

module.exports = {
    axios,
    post,
    get
}