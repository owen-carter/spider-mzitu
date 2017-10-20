const fs = require('fs');
const request = require('request');
const logger = require('./log.conf');


class wGeter {
    constructor() {
        this.taskList = [];
        this.taskNumber = 0;
    }

    init() {
        process.on('message', (tasks) => {
            this.addTask(tasks)
        });

        setInterval(() => {
            if (this.taskList.length > 1 && this.taskNumber < 200) {
                this.curl(this.taskList.shift());
                this.taskNumber++;
            }
        }, 1000 * 0.01)

    }

    addTask(tasks) {
        this.taskList.push(...tasks)
    }

    curl(url) {
        let stream, filename, path;
        filename = url.split('/');
        filename = filename.pop();
        path = './images/' + filename;
        logger.info(`downloading ${filename}`);

        stream = fs.createWriteStream(path);
        let referer = {'Referer': 'http://www.mzitu.com/103478'};
        request({url: url, headers: referer})
            .pipe(stream)
            .on('error', (err) => {
                logger.error(err);
                this.taskNumber--;
            })
            .on('close', () => {
                this.taskNumber--;
            });
    }

    run() {
        this.init()
    }
}

let app = new wGeter();
app.run();
