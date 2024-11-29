const { chromium } = require('playwright');
const yisouScript = require('./yisou/index')
const EventManager = require('../classes/eventManager')
const crawlerConfig = require('../config/crawler')
const alipanProxy = require('../wangpan/alipan/alipanProxy')


class browserCrawler {
    constructor() {
        if (browserCrawler.instance) {
            return browserCrawler.instance;
        }
        this.browser = null
        this.page = null
        this.eventManager = new EventManager()
        this.alipanProxy = new alipanProxy()
        this.inited = false
        browserCrawler.instance = this;
    }

    async init() {
        if (this.inited) {
            return
        }
        const { headless } = crawlerConfig
        this.browser = await chromium.launch({
            headless
        });
        this.context = await this.browser.newContext();
        await this.context.addInitScript("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    }

    async crawlKeyword(topicId, keyword) {
        if (this.inited == false) {
            await this.init()
        }
        yisouScript(this.context, keyword, (alilinks) => {
            const msg = {
                type: 'GET Links',
                data:  alilinks,
                time: new Date().toLocaleString()
              }
            this.eventManager.addMsg(topicId, msg)
            for (const link of alilinks) {
                this.alipanProxy.queueLink(topicId, link)
            }
        })
    }

    async close() {
        await context.close();
        await browser.close();
    }
}

module.exports = browserCrawler