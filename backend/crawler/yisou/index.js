const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://cdn.yiso.fun/');
  await page.getByRole('button', { name: '不再弹出' }).click();
  await page.getByRole('combobox').selectOption('ali');
  await page.getByPlaceholder('输入关键词，回车/换行即可 搜索全网云盘资源').click();
  await page.getByPlaceholder('输入关键词，回车/换行即可 搜索全网云盘资源').fill('双城之战');
  await page.getByPlaceholder('输入关键词，回车/换行即可 搜索全网云盘资源').press('Enter');

  await page.waitForSelector('#app > div > div > div.page-wrapper > div.page-body > div.container-xl > div > div.col-md-8 > div:nth-child(1)');
  const links = await page.$$eval('a', as => as.map(a => a.href));

  // 打印所有链接
  console.log('Found links:', links);

  // ---------------------
  // await context.close();
  // await browser.close();
})();