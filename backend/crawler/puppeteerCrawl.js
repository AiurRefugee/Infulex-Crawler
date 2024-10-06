const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth') 
puppeteer.use(StealthPlugin()) 

async function visitPage() {
    // 启动浏览器
    const browser = await puppeteer.launch({ headless: false});
    // 打开一个新的页面
    const page = await browser.newPage();
    // 访问指定的URL
    await page.goto('https://wpxz.top/?q=%E5%A4%8D%E4%BB%87%E8%80%85%E8%81%94%E7%9B%9F');
    // 可以在这里添加更多的操作，比如页面截图或获取页面内容等
    // 例如，获取页面的标题
    const title = await page.title();
    console.log(`Page title: ${title}`);
    // 关闭浏览器
    // await browser.close();
}

visitPage();
