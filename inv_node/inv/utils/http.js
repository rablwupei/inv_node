/**
 * Created by wupei on 16/9/24.
 */


var request = require('request');
request.debug = true;
request({
    url :'http://www.baidu.com',
    timeout : 30*1000,
    method : 'GET',
    // body : "abc",
    // gzip : true,
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    }
    console.log("%s, %s, %s", error, response, body) // Show the HTML for the Google homepage.
})