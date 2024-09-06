const { crawlShareLink } = require('./share')
const { share_file_save_all_to_drive } = require('./fileOpt')

// 全部文件>爱奇艺
const to_parent_file_id = '66daa2b88fd8e427f1804b2b87b0cc57f069e7ac'


const crawlAndSaveLink = async (sharelink) => {

    const response = await crawlShareLink(sharelink)
 
    if (response) {
        const { share_id, file_id, share_token, name } = response
        console.log('find video', name)
        const res = await share_file_save_all_to_drive({ share_id, share_token }, { file_id, to_parent_file_id })
        console.log('crawlShareLink', res)
    }
    
}

crawlAndSaveLink('https://www.alipan.com/s/DGNuiQrSfEo')

module.exports = {
    crawlAndSaveLink
}

