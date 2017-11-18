# spider-mzitu [![Build Status](https://www.travis-ci.org/owen-carter/spider-mzitu.svg?branch=master)](https://www.travis-ci.org/owen-carter/spider-mzitu)
> 一个多进程的妹子图的爬虫，使用nodejs编写

### 解决什么问题?
- 下载妹子图 http://www.mzitu.com/
- 下载妹子图，并且存入硬盘
- 只需要自定义解析图片规则，既可以开始下载整站图片

### 如何开始？
- 手动方式
	- git clone https://github.com/owen-carter/spider-mzitu.git
	- cd spider-mzitu
	- npm install
	- npm run app
- 自动
```bash
curl -o- https://raw.githubusercontent.com/owen-carter/spider-mzitu/master/start.sh | bash
```

### Image 
![image](./images/snipaste_20171118_192446.png)


### 如何自定义规则
```javascript
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
```

### Changelog

+ 2017/09/24
    - 添加了下载进程
    - 处理了反盗链问题
+ 2017/09/25
    - 添加了url去重策略
+ 2017/09/26
    - 改善了下载速度
    - 发布了V1.0.0.0 版本
