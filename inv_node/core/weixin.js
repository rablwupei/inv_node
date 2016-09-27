/**
 * Created by wupei on 16/9/26.
 */

var util = require('util');
var utils = require('./utils');
var co = require('co');
var http = require('./http');
var assert = require('assert');

var weixin = {};

var corpID = 'wx49ef3962c2f3a2c0';
var secret = 'l4mKdYE-C1VCROkcjmYoMv8dOQ3w1mF35L0dePiRXbL_SW5MMG7AN5tnURhAGvmb';

weixin.send = function (msg) {
    co(function* () {
        var txt = msg.message;

        // var gettokenUrl = util.format("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=%s&corpsecret=%s", corpID, secret);
        // var body = yield http.get(gettokenUrl);
        // var access_token = JSON.parse(body).access_token;
        // assert(access_token, "access_token empty, body = %s", body);
        var access_token = "abc";

        var form = JSON.stringify({
            text : { content : txt },
            touser : msg.touser,
            toparty : "",
            totag : "",
            msgtype : "text",
            agentid : 0,
            safe : 0,
        });
        var msgUrl = util.format("https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s", access_token);
        var body = yield http.post(msgUrl, form);
        var bodyJson = JSON.parse(body);
        if (bodyJson.errcode == 40014) {

        } else if (bodyJson.errcode == 0) {

        }
        console.log(body);

    }).catch(function (err) {
        utils.error(err);
    });
};

module.exports = weixin;