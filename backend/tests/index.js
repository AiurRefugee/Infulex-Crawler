const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch(); // 启动Chromium浏览器
  const page = await browser.newPage(); // 创建新页面
  await page.goto('https://pan666.net/'); // 导航到指定URL
  const title = await page.title(); // 获取页面标题
  console.log(title); // 输出网页标题
  await browser.close(); // 关闭浏览器
})();