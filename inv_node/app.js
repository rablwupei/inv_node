
var utils = require('./utils/utils');

utils.log('inv v1.0.0');

// setInterval(function () {
//     var http = require('./utils/http');
//     http.get('http://hq.sinajs.cn/list=sh601006', function (err, response, body) {
//         utils.log("%s, %s, %s", new Date().toString(), err, response, body);
//     }, {gzip : false, encoding : 'GBK'})
// }, 2000);

// var http = require('./utils/http')
// var body = yield http.get('http://hq.sinajs.cn/list=sh601006', null, {gzip : false, encoding : 'GBK'});
// utils.log(body)
//
// require('./runners/runner1')
var co = require('co')

co(function* () {
    console.log("Hello");
    var http = require('./utils/http');
    var body = yield http.get('http://hq.sinajs.c1n/list=sh601006', null, {gzip : false, encoding : 'GBK'});

    console.log("World", body, body);
}).catch(function (err, b, c) {
    console.error("abc", err, b, c);
});