/**
 * Created by wupei on 16/9/24.
 */

var http = {};

var request = require('request');
var iconv = require('iconv-lite');

var timeout = 30 * 1000;

http.get = function (url, callback, option) {
    option = option || {};
    option.url = url;
    option.timeout = option.timeout || timeout;
    option.method = option.method || 'GET';
    if (option.gzip !== false) {
        option.gzip = true;
    }
    var isGBK = option.encoding == 'GBK';
    if (isGBK) {
        option.encoding = null;
    }
    request(option, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (isGBK) {
                callback(false, response, iconv.decode(body, 'GBK'));
            } else {
                callback(false, response, body);
            }
        } else {
            callback(true, response, body);
        }
    })
};

http.post = function (url, post, callback, option) {
    option = option || {};
    option.body = post;
    option.method = 'POST';
    http.get(url, callback, option);
};

http.get = function (url, callback, option) {
    option = option || {};
    option.url = url;
    option.timeout = option.timeout || timeout;
    option.method = option.method || 'GET';
    if (option.gzip !== false) {
        option.gzip = true;
    }
    var isGBK = option.encoding == 'GBK';
    if (isGBK) {
        option.encoding = null;
    }
    return new Promise(function(resolve, reject) {
        request(option, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (isGBK) {
                    resolve(iconv.decode(body, 'GBK'));
                } else {
                    resolve(body);
                }
            } else {
                reject(error);
            }
        });
    });
};

module.exports = http;