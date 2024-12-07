

const xiaozhanScript = async (context, title, callback) => {
  console.log('yisouScript', context, title);
  
  // await context.addCookies(cookies)
  const page = await context.newPage(); 
  await context.addInitScript(() => {
    navigator.webdriver = undefined;
  })
  await page.goto('https://pan666.net/?q=' + title);
  

  await page.waitForSelector('ul[role="feed"]');
  const links = await page.$$eval('a', as => as.map(a => a.href));
  let aliLinks = new Set(links.filter(link => link.includes('www.ali')));

  aliLinks = Array.from(aliLinks).map(link => ({ link, status: 'normal' }))
  // 打印所有链接
  console.log('Found links:', aliLinks);

  if (callback) {
    callback(Array.from(aliLinks));
  }
 
}

// xiaozhanScript()

module.exports = xiaozhanScript