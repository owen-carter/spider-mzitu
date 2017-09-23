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

