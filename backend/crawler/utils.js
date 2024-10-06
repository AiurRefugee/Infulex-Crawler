function extractYears(str) {
    // 正则表达式匹配1900-2100之间的年份
    const regex = /\b(19[0-9]{2}|20[0-9]{2}|2100)\b/g;
    const matches = Array.from(regex.exec(str))
    
    return matches[0];
} 

const sleep = async (delay) => new Promise((resolve) => {
    setTimeout(resolve, delay || 200);
})

function removeKeyword(str) {
    const keywords = [
        '杜比视界', '国语', '特效', '字幕', '音轨', '高清', '超高清', '纪录片', '4k', '杜比世界', '杜比世界',
        '杜比', 
    ]
    return keywords.reduce((currentString, element) => {
        let regex = new RegExp(element, 'gi'); // 创建正则表达式
        return currentString.replace(regex, ''); // 删除匹配的元素
    }, str);
} 

function extractChinese(str) { 
    const regex = /[\u4e00-\u9fa5]/g;
    const matches = [];
    let match;

    // 使用循环来找到所有匹配项
    while ((match = regex.exec(str)) !== null) {
        matches.push(match[0].trim());
    }

    return matches.join('');
} 

// function extractFilmName(str) {
//     const removedKeyword = removeKeyword(str)
//     const chinese = extractChinese(removedKeyword).join(' ').trim()
//     const year = extractYears(str)
//     const letters = Array.from(str)
//     const start = letters.findIndex(item => item >= 'A' && item <= 'Z')
//     const fileName = str.slice(start, str.length)
//     const words = fileName.split('.')
//     const startIndex = words.findIndex(item => Number(item.trim()))
//     var filmName = words.slice(0, startIndex).join(' ').trim()
//     filmName = filmName.length < 30 ? fileName : ''
//     const res = {
//         chinese,
//         filmName,
//         year
//     }
//     return res
// }

// const name = `C 穿越苍穹4K REMUX (2007)[0260]	https://www.aliyundrive.com/s/BzZB3qcv1gR`
const name = `007:大破天幕杀机4K REMUX(2012)[杜比视界][0663]	https://www.aliyundrive.com/s/XoHvNwqCEWW`
function extractFilmName(str) {
    const words = str.split(' ')
    const name = words.slice(0, 2)
    var file
    if(name[0] >= 'A' && name[0] <= 'Z') {
        file = name[1]
    } else {
        file = name[0]
    }
    return file.replace('4K', '')
} 

function extractUrl(str) {
    let regex = /\bhttps?:\/\/[^\s"]+\b/g; // 'g' 代表全局搜索
    let urls = str.match(regex);
    return urls[0]
}

const fs = require('fs');
const path = require('path');

// 指定要处理的文件夹路径
const directoryPath = path.join(__dirname, 'data/filmImages/w900');

// 读取目录中的所有文件和文件夹
// fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     }
    
//     // 遍历所有文件
//     files.forEach(file => {
//         const filePath = path.join(directoryPath, file);
        
//         // 检查文件名是否以.jpg结尾
//         if (path.extname(file) === '.jpg') {
//             // 新的文件名（去掉.jpg后缀）
//             const newFilePath = filePath.slice(0, -5);
            
//             // 重命名文件
//             fs.rename(filePath, newFilePath, (err) => {
//                 if (err) {
//                     console.log('Error renaming file: ' + err);
//                 } else {
//                     console.log(`${file} was renamed to ${path.basename(newFilePath)}`);
//                 }
//             });
//         }
//     });
// });


module.exports = {
    extractFilmName,
    extractUrl,
    sleep
}