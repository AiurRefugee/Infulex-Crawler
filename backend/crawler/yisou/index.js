const { cookies } = require('./cookie.js')
const crawlerConfig = require('../../config/crawler/index.js')
const { maxPage } = crawlerConfig

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const yisouScript = async (context, title, callback) => { 

  const postMessage = async () => {
    const links = await page.$$eval('a', as => as.map(a => a.href));
    let aliLinks = new Set(links.filter(link => link.includes('www.ali')));

    aliLinks = Array.from(aliLinks).map(link => ({ link, status: 'normal' }))
    // 打印所有链接
    console.log('Found links:', aliLinks);
    if (callback) {
      callback(Array.from(aliLinks));
    }
  }
  console.log('yisouScript', context, title);
  
  // await context.addCookies(cookies)
  const page = await context.newPage(); 
  await context.addInitScript(() => {
    navigator.webdriver = undefined;
    document.cookie = 'satoken=ee5d6ee4-8323-47de-b68b-834b403a7bca'
    const session = {
      "__tea_session_id_20001731": "{\"sessionId\":\"e85bae56-a2f7-43c5-ab2a-f7a6ccea8428\",\"timestamp\":1732947242348}",
      "Hm_lpvt_a15c82bda728e1e61fde8b9c2a73df91": "1732947242",
      "HMACCOUNT": "8C2523AD65F9BB02"
  }

    const storage = {
      "__tea_cache_tokens_20001731": "{\"web_id\":\"7440762460698632459\",\"user_unique_id\":\"7440762460698632459\",\"timestamp\":1732945548809,\"_type_\":\"default\"}",
      "islogin": "true",
      "satoken": "ee5d6ee4-8323-47de-b68b-834b403a7bca",
      "announcement": "true",
      "__tea_cache_first_20001731": "1",
      "Hm_lvt_a15c82bda728e1e61fde8b9c2a73df91": "1764481548640|1732437517,1732945531"
    }
    for (const [key, value] of Object.entries(storage))
      window.localStorage.setItem(key, value); 
    for (const [key, value] of Object.entries(session))
      window.sessionStorage.setItem(key, value);
    console.log(document.cookie)
  })
  await page.goto(`https://cdn.yiso.fun/info?searchKey=${title}&from=ali`);
  

  for (let i = 0; i < maxPage; i++) {
    try {
      await page.waitForSelector('#app > div > div > div.page-wrapper > div.page-body > div.container-xl > div > div.col-md-8 > div:nth-child(1)');

      postMessage()
    
      const button = await page.$$('button.btn-next');

      await sleep(5000)

      await button[2].click();
    } catch (error) {
      console.log('error', error) 
    }
  }
  

  // ---------------------
  // await context.close();
  // await browser.close();
}

module.exports = yisouScript