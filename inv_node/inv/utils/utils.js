/**
 * Created by wupei on 16/9/24.
 */

var util = require('util');

var utils = {};

utils.log = function(data, ...params) {
    if (typeof(data) == 'string') {
        console.log(data, ...params);
    } else {
        console.log(util.inspect(data), ...params);
    }
};

utils.error = function(data, ...params) {
    console.error(data, ...params);
};

module.exports = utils;
