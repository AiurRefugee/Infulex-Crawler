
const axios = require('axios');
const { get, post } = require('../axios/axiosWrapper') 
const videoListUrl = 'https://mesh.if.iqiyi.com/portal/v5/pcw/channel/tv?vip=0&device=10a627f2798124d2dab8bf896c90a8d0&v=9.9.165.6526&mode=page&page=2&isLowPerformPC=0&conduit_id=z43&ip=202.108.14.240&scale=150'


const getAiqiyiVideoList = async () => {
    const videoJson = await get(videoListUrl)
    const videoList = videoJson.items

    const getTitles = (index) => {
        const videos = videoList?.[index]?.video?.[0]?.data
        const videoTitles = videos.map(item => item.title)
        return videoTitles
    }
    // 热播网剧
    const rebowangjuIndex = 0
    const wangju = getTitles(rebowangjuIndex)

    // 即将上线
    const upcomingIndex = 1
    const upcoming = getTitles(upcomingIndex)

    // 热门剧集
    const hotIndex = 3
    const dianshiju = getTitles(hotIndex)

    const titleSet = new Set([...wangju, ...dianshiju])
    console.log(titleSet)
    return titleSet
}
 

module.exports = {
    getAiqiyiVideoList
}