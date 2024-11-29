const session = {
  "__tea_session_id_20001731": "{\"sessionId\":\"f09a7969-3f03-43f9-a140-5660ae2866e4\",\"timestamp\":1732808003585}",
  "Hm_lpvt_a15c82bda728e1e61fde8b9c2a73df91": "1732808004",
  "HMACCOUNT": "5966599C68CDA8D6"
}

const storage = {
  "islogin": "true",
  "announcement": "true",
  "__tea_cache_tokens_20001731": "{\"web_id\":\"7439374761060340746\",\"user_unique_id\":\"cossc0r5cfuj3ge67j7g\",\"timestamp\":1732808003565,\"_type_\":\"default\"}",
  "satoken": "2152d8e7-b0ca-493e-9355-51d94fb42244",
  "__tea_cache_first_20001731": "1",
  "Hm_lvt_a15c82bda728e1e61fde8b9c2a73df91": "1764344003512|1731327223,1732114414,1732626454,1732807963",
  "useragent-switcher-uastring": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5"
}

const yisouScript =  async (context, title, callback) => {
  console.log('yisouScript', context, title);
  const page = await context.newPage();
  await context.addInitScript(() => {
      for (const [key, value] of Object.entries(storage))
          window.localStorage.setItem(key, value);
  })
  await page.goto('https://cdn.yiso.fun/');
  await page.getByRole('button', { name: '不再弹出' }).click();
  await page.getByRole('combobox').selectOption('ali');
  await page.getByPlaceholder('输入关键词，回车/换行即可 搜索全网云盘资源').click();
  await page.getByPlaceholder('输入关键词，回车/换行即可 搜索全网云盘资源').fill(title);
  await page.getByPlaceholder('输入关键词，回车/换行即可 搜索全网云盘资源').press('Enter');

  await page.waitForSelector('#app > div > div > div.page-wrapper > div.page-body > div.container-xl > div > div.col-md-8 > div:nth-child(1)');
  const links = await page.$$eval('a', as => as.map(a => a.href));
  const aliLinks = links.filter(link => link.includes('ali'));

  // 打印所有链接
  console.log('Found links:', aliLinks);

  if (callback) {
    callback(aliLinks);
  }

  // ---------------------
  // await context.close();
  // await browser.close();
}

module.exports = yisouScript