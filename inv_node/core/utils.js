/**
 * Created by wupei on 16/9/24.
 */

var util = require('util');

var utils = {};

utils.log = function(data, ...params) {
    console.log(data, ...params);
};

utils.error = function(data, ...params) {
    console.error(data, ...params);
};

utils.dump = function (data) {
    console.log(util.inspect(data));
};

module.exports = utils;
