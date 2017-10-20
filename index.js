/**
 * 需要从这个里边加载事件
 */

const Spider = require('./bin');
const app = new Spider();

// 填写网站首页地址
app.init('http://www.mzitu.com/');
app.registerImageParser(($) => {
    let imgs, urls;
    // 填写图片的选择器
    imgs = $(".main-image img");
    imgs = Array.from(imgs);

    return imgs.map((ele) => {
        return $(ele).attr('src')
    });
});
app.run();