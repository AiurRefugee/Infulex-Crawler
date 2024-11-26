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

  // ---------------------
  // await context.close();
  // await browser.close();
})();