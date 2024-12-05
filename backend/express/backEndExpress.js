const express = require('express');
const { crawlKeyWord } = require('../crawler/xiaozhanCrawler/index');
const listenGetTaskList = require('./apis/tasks/getTaskList');
const listenPOSTaddToFavorite = require('./apis/medias/addToFavorite');
const listenGetFavoriteList = require('./apis/medias/getFavoriteList');
const listenPOSTRemoveFavorite = require('./apis/medias/removeFromFavorite');
const listenPOSTAddToLibrary = require('./apis/medias/addToLibrary');
const listenGetLibraryList = require('./apis/medias/getLibraryList');
const listenPOSTRemoveFromLibrary = require('./apis/medias/removeFromLibrary');
const listenGetTops = require('./apis/medias/getTops');
const listenGetGenres = require('./apis/medias/getGenres')
const listenPOSTCreateTask = require('./apis/tasks/createTask')
const listenPOSTaskDetail = require('./apis/tasks/getTaskDetail')
const listenPOSTfindFavorite = require('./apis/medias/findFavorite')
const taskPool = new Set()

const app = express();
const port = 3000; // 指定应用程序监听的端口号

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
  }

const taskPools = {}

// 用于解析 application/json
app.use(express.json());

// 定义一个简单的 GET 请求处理程序
app.get('/', (req, res) => {
    res.send('Hello World!');
});

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


listenGetTaskList(app)
listenPOSTaddToFavorite(app)
listenGetFavoriteList(app)
listenPOSTRemoveFavorite(app)
listenPOSTAddToLibrary(app)
listenGetLibraryList(app)
listenPOSTRemoveFromLibrary(app)
listenGetTops(app)
listenGetGenres(app)
listenPOSTCreateTask(app)
listenPOSTaskDetail(app)
listenPOSTfindFavorite(app)

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// crawlKeyWord({
//     title: '海贼王',
//     original_title: 'one piece'
// })