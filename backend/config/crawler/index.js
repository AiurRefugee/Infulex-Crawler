const crawlerConfig = {
  // 爬虫配置
  headless: false,
  maxPage: 2,
  alipanInterval: 1000, // 请求间隔
  maxLayer: 10,
  msgType: ['GET Video', 'GET File', 'GET Links', 'Share_Token Error', 'Task Done']
}

module.exports = crawlerConfig