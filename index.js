/**
 * 需要从这个里边加载事件
 */

const Spider = require('./bin');
const app = new Spider();

app.init('http://blog.csdn.net/zhangyuan19880606/article/details/51993011');
app.registerImageParser(($) => {
    let links;
    links = $("a");
    links = Array.from(links);
    // 同时想办法把图片地址给解析了
    return links.map((ele) => {
        if ( $(ele).text().includes('面试') ){
            return $(ele).attr('href')
	}
    });
});
app.run();
