/**
 * 需要从这个里边加载事件
 */

const Spider = require('./bin');
const app = new Spider();

app.init('http://www.mzitu.com/');
app.registerImageParser(($) => {
    let imgs, urls;
    imgs = $(".main-image img");
    imgs = Array.from(imgs);
    // 同时想办法把图片地址给解析了
    return imgs.map((ele) => {
        return $(ele).attr('src')
    });
});
app.run();