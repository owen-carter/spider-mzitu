/**
 * Created by owen on 2017/8/12.
 */
const log4js = require('log4js');

log4js.configure({
    categories: {
        default: {
            appenders: ['spider', 'out'],
            level: 'info'
        }
    },
    appenders: {
        out: {type: 'stdout'},
        spider: {
            type: 'file',
            filename: './spider.log'
        }
    }
});

let logger = log4js.getLogger('spider');
module.exports = logger;
