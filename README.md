# spider-mzitu [![Build Status](https://www.travis-ci.org/owen-carter/spider-mzitu.svg?branch=master)](https://www.travis-ci.org/owen-carter/spider-mzitu)

### 解决什么问题?
- 下载妹子图 http://www.mzitu.com/
- 下载妹子图，并且存入硬盘

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

### 工作原理
- 开始工作
- 使用种子地址
- 获取首页
- 拿到首页
- 分析可用链接
- 拿到可用链接
- 存入链接池子
- 获取下一个链接
- 开始下一轮怕页面
-


### 有一个进程
- 获取一批url从子进程
- 拿到页面，分析可用链接
- 保持当前链接数字在100以内
- 如果