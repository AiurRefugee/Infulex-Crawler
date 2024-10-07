const { get, post } = require('../../axios/axiosWrapper')

const { searchMulti } = require('../../tmdbAPIs/tmdbAPI')

searchMulti('爱我就让我快乐').then ( res => console.log(res) )