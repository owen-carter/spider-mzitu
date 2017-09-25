const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const mkdirp = require('mkdirp');
const logger = require('./log.conf');
const child_process = require('child_process');

class Spider {
    constructor() {
        this.workDirectory = './images';
        this.activeUrlPool = [];
        this.inactiveUrlPool = [];
    }

    init(seedUrl) {
        this.addToQueen([seedUrl]);
        Spider.createWorkSpace(this.workDirectory)
        this.forkDownload()
    }

    forkDownload() {
        this.wGeter = child_process.fork('./bin/download.js');
    }

    addDownTask(task) {
        this.wGeter.send(task)
    }

    run() {
        logger.info('app started!');
        this.loop();
    }

    loop() {
        let target;
        target = this.activeUrlPool.shift();
        this.inactiveUrlPool.push(target);
        logger.info(`push a url from activeUrlPool: ${target}`);
        this.getPage(target, this.parsePage.bind(this))
    }

    addToQueen(urls) {
        urls.forEach((url, idx) => {
            if (!this.activeUrlPool.includes(url) && !this.inactiveUrlPool.includes(url)) {
                this.activeUrlPool.push(url)
                logger.info(`activePool has ${this.activeUrlPool.length} elements`);
            } else {
                logger.error(`${url} is repeat ...`)
            }
        });
    }

    static createWorkSpace(dir) {
        mkdirp(dir, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

    getPage(href, callBack) {
        href = `${href}`;
        let conf = {
            url     : href,
            method  : "GET",
            encoding: null,
            headers : {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
            }
        };
        logger.info(`access ${href}`);
        request(conf, (error, response, body) => {
            if (error) {
                logger.error(`get a page ${href} fail!`);
                return this.loop();
            }
            logger.info(`get ${href} succeed!`);
            body = iconv.decode(body, 'gb2312');
            callBack(body)
        });
    }

    registerImageParser(parser) {
        if (parser) {
            this.imageParser = parser.bind(this);
            return this;
        }
    }

    parseUrl($) {
        let links, urls;
        links = $("a[target='_blank']");
        links = Array.from(links);
        // 同时想办法把图片地址给解析了
        return links.map((ele) => {
            return $(ele).attr('href')
        });
    }


    /***
     * 解析页面
     * @param html
     */
    parsePage(html) {
        let $, urls, images;
        try {
            $ = cheerio.load(html, {decodeEntities: false});
        } catch (error) {
            logger.error(error)
        }
        // 拿到页面中有用的url
        urls = this.parseUrl($);
        this.addToQueen(urls);

        // 解析url应该输入应用本身要做的事情，用户要做的事情很简单，就只是解析图片或者视频，因此
        images = this.imageParser($);
        this.addDownTask(images);

        // 开始下一个循环
        this.loop();
    }


}

module.exports = Spider;