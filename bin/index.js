const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const mkdirp = require('mkdirp');
const logger = require('./log.conf');

class Spider {
    constructor() {
        this.workDirectory = './images';
        this.activeUrlPool = [];
        this.inactiveUrlPool = [];
    }

    init(seedUrl) {
        this.addToQueen([seedUrl]);
        Spider.createWorkSpace(this.workDirectory)
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
        this.activeUrlPool.push(...urls)
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
            url: href,
            method: "GET",
            encoding: null,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
            }
        };
        logger.info(`access ${href}`);
        request(conf, (error, response, body) => {
            if (error) {
                logger.error(`get a page ${href} fail!`);
                return;
            }
            logger.info(`get ${href} succeed!`);
            body = iconv.decode(body, 'gb2312');
            callBack(body)
        });
    }

    registerParser(parser) {
        if (parser) {
            this.parser = parser.bind(this);
            return this;
        }
    }

    /***
     * 解析页面
     * @param html
     */
    parsePage(html) {
        let $, urls;
        try {
            $ = cheerio.load(html, {decodeEntities: false});
        } catch (error) {
            logger.error(error)
        }
        urls = this.parser($);
        this.addToQueen(urls);
        this.loop();
    }


    getImage() {

    }

    parseImage() {

    }


}

module.exports = Spider;