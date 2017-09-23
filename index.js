/**
 * 需要从这个里边加载事件
 */

const Spider = require('./bin');
const app = new Spider();

app.init('http://www.mzitu.com/');
app.registerParser(($) => {
    let links, urls;
    links = $("a[target='_blank']");
    links = Array.from(links);
    return links.map((ele) => {
        return $(ele).attr('href')
    });
});
app.run();