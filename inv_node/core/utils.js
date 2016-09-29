/**
 * Created by wupei on 16/9/24.
 */

var winston = require('winston');
var moment = require('moment');

winston.add(winston.transports.File, {
    filename: 'runners-exception.log',
    handleExceptions: true,
    humanReadableUnhandledException: true
});

var logger = new winston.Logger({
    level: 'info',
    transports: [
        new (winston.transports.Console)({
            'timestamp': function() { return moment().format('MM-DD HH:mm:ss'); }
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: './runners-error.log',
            level: 'error',
            json: false,
            maxsize: 1024*1024*5,
            'timestamp': function() { return moment().format('YYYY-MM-DD HH:mm:ss'); }
        })
    ]
});

var util = require('util');

var utils = {};

utils.log = function(data, ...params) {
    logger.info(data, ...params);
};

utils.error = function(data, ...params) {
    logger.error(data, ...params);
};

utils.dump = function (data) {
    console.log(util.inspect(data));
};

utils.sprintf = require("sprintf-js").sprintf;

module.exports = utils;
