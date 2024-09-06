const QRCode = require('qrcode');
const fs = require('fs');
const { get, post } = require('../axios/axiosWrapper')

// 定义文件路径
const filePath = '/Users/hujiayou/.aligo/aligo.json'

// 刷新token
const refreshUrl = 'https://api.aliyundrive.com/v2/account/token'


// 生成二维码
// QRCode.toDataURL('https://www.example.com', function (err, url) {
//     if (err) console.error(err) 
//     // 移除数据 URI 的前缀（如果有）
//     const base64ImageWithoutPrefix = url.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

//     // 将 base64 字符串转换为二进制数据
//     const buffer = Buffer.from(base64ImageWithoutPrefix, 'base64');

//     // 将二进制数据保存为图像文件
//     fs.writeFile('output.png', buffer, { encoding: 'base64' }, (err) => {
//         if (err) throw err;
//         console.log('图像已保存。');

//         // 打开图像文件
//         fs.open('output.png', 'r+', function(err, fd) {
//             if (err) {
//                 return console.error(err);
//             }
//            console.log("文件打开成功！");     
//          });
//     });
// });

// 从JSON文件中获取refreshToken
const getRefreshTokenFromJSON = () => {
    const json = fs.readFileSync(filePath);
    const data = JSON.parse(json);
    return data.refresh_token;
}



// 获取分享信息
const getShareCode = async (shareLink) => {
    const getSharePwdUrl = `https://api.aliyundrive.com/adrive/v2/share_link/extract_code`
    const response = await post(getSharePwdUrl, {
        content: shareLink
    })
    console.log('getShareCode', response)
    return response.data
} 

// 保存accessToken
const saveAccessToken = async (fileName, data) => {
    fs.writeFileSync(fileName, JSON.stringify(data), 'utf-8')
}

// 读取accessToken
const readAccessToken = async (fileName) => {
    const json = await fs.readFileSync(fileName)
    const data = JSON.parse(json)
    const access_token = data?.access_token
    return access_token
}


// 获取shareToken
const getShareToken = async (shareLink) => {
    const { share_id, share_pwd } = await getShareCode(shareLink)
    const getShareTokenUrl = `https://api.aliyundrive.com/v2/share_link/get_share_token`
    const data = await post(getShareTokenUrl, {
        share_id,
        share_pwd
    })
    console.log('getShareToken', data?.share_token)
    const share_token = data?.share_token
    return {
        share_token,
        share_id,
        share_pwd
    }
}
 

// 获取 AccessToken
const getAccessToken = async () => {
    const refreshToken = getRefreshTokenFromJSON() 
    const data = await post(refreshUrl, {
        'refresh_token': refreshToken,
        'grant_type': 'refresh_token'
    })   
    const access_token = data?.access_token
    console.log('access_token', access_token)
    await saveAccessToken(filePath, data)
    return access_token
}


module.exports = {  
    getShareToken,
    getAccessToken,
    readAccessToken,
    saveAccessToken, 
}