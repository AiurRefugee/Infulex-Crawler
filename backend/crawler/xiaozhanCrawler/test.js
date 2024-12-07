const { chromium } = require('playwright');

(async (title) => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  await context.addInitScript(() => {
    navigator.webdriver = undefined; 
    window.navigator.__proto__.webdriver = undefined;
  })
   
  const page = await context.newPage(); 
  await page.goto('https://pan666.net/?q=双城之战' );
  

  await page.waitForSelector('ul[role="feed"]');
  const links = await page.$$eval('a', as => as.map(a => a.href));
  console.log(links);
  let aliLinks = new Set(links.filter(link => link.includes('www.ali')));

  aliLinks = Array.from(aliLinks).map(link => ({ link, status: 'normal' }))
  // 打印所有链接
  console.log('Found links:', aliLinks);
  
})('双城之战');