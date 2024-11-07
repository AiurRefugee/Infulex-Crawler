const express = require('express');
const { crawlKeyWord } = require('../crawler/xiaozhanCrawler/index');
const listenGetTaskList = require('./apis/tasks/getTaskList');
const listenPOSTAddFavorite = require('./apis/medias/addFavorite');
const listenGetFavoriteList = require('./apis/medias/getFavoriteList');
const taskPool = new Set()

const app = express();
const port = 3000; // 指定应用程序监听的端口号

const taskPools = {}

// 用于解析 application/json
app.use(express.json());

// 定义一个简单的 GET 请求处理程序
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/createTask', (req, res) => {
    const { media, mediaType, keywordObj } = req.body;
    console.log(media, mediaType, keywordObj) 
})


app.post('/crawlKeyword', (req, res) => {
    console.log('received request')
    // 设置 HTTP 响应头
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    const { title, original_title} = req.body; 
    

    // 发送消息的函数
    const sendSSE = (data) => {
        const package = {
            ...data,
            time: new Date().toLocaleString()
        } 
        res.write(`data: ${JSON.stringify(package)}\n\n`);
    };
    const taskManager = {
        canceled: false,
        sendSSE
    }
    taskPool[title + '/' + original_title] = taskManager

    crawlKeyWord({
        title,
        original_title
    }, 1, taskManager)
    


    // 在客户端断开连接时清理资源
    req.on('close', () => {
        console.log('client disconnected'); 
    });
});

app.post('cancelTask', (req, res) => {
    const { title, original_title} = req.body; 
    taskPool[title + '/' + original_title]['canceled'] = true
})

listenGetTaskList(app)
listenPOSTAddFavorite(app)
listenGetFavoriteList(app)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// crawlKeyWord({
//     title: '海贼王',
//     original_title: 'one piece'
// })