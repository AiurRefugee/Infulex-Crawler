const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  await context.addInitScript(() => {
    navigator.webdriver = undefined; 
    window.navigator.__proto__.webdriver = undefined;
  })
   
  const page = await context.newPage();
  await page.goto('https://pan666.net/?q=双城之战');

  //   await page.getByRole('button', { name: '不再弹出' }).click();
  //   await page.getByRole('combobox').selectOption('ali');
  //   await page.getByPlaceholder('输入关键词，回车/换行即可 搜索全网云盘资源').click();
  //   await page.getByPlaceholder('输入关键词，回车/换行即可 搜索全网云盘资源').fill('双城之战');
  //   await page.getByPlaceholder('输入关键词，回车/换行即可 搜索全网云盘资源').press('Enter');

  //   // ---------------------
  //   await context.close();
  //   await browser.close();
})();