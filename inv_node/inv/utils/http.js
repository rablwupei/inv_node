/**
 * Created by wupei on 16/9/24.
 */

var request = require('request');
var iconv = require('iconv-lite');

request({
    url :'http://hq.sinajs.cn/list=sh601006',
    timeout : 30*1000,
    method : 'GET',
    // body : "abc",
    // gzip : true,
    // encoding : 'GBK',
    encoding: null,
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    }
    console.log("%s, %s, %s", error, response, iconv.decode(body, 'GBK')) // Show the HTML for the Google homepage.
})
