const logger = require('./log.conf');


class wGeter {
    constructor() {
        this.taskList = [];
    }

    init() {
        process.on('message', (tasks) => {
            this.addTask(tasks)
        })

    }

    addTask(tasks) {
        this.taskList.push(...tasks)
    }

    curl(url) {
        logger.info(`download ${url}`)
    }

    run() {
        this.init()
    }
}

let app = new wGeter();
app.run();