
var assert = require('assert');
var co = require('co');
var sleep = require('co-sleep');
var fs = require('co-fs');
var wrap = require('co-nedb');
var db = require('./core/db');

var utils = require('./core/utils');
var config = require('./core/config');

utils.log('inv v1.0.0');

config.default_interval = 10; //每10秒触发一次所有runner
config.default_sendMsgRate = 60 * 5; //符合条件时5分钟发一次Message
config.debug = true;
config.sendMsg = false;

var log = function (...args) {
    if (config.debug) {
        utils.log(...args);
    }
};

var run = function* () {
    var runnerPath = './runners';
    var files = yield fs.readdir(runnerPath);
    assert(files.length > 0, 'runners.length == 0');

    db.init('./runners.db');

    for (var i = 0; i < files.length; i++) {
        co(function* () {
                var path = runnerPath + '/' + files[i];
                while (true) {
                    try {
                        var cls = require(path);
                        var runner = new cls();
                        var hasSend = yield db.hasSend(path);
                        log("check: " + path + ", hasSend: " + hasSend);
                        if (!hasSend) {
                            log("run: " + path);
                            var result = yield runner.run();
                            if (result) {
                                log("send: " + path);
                                yield db.setSend(path);
                                runner.postMessage();
                            }
                        }
                    } catch (err) {
                        utils.error(err);
                    }
                    yield sleep(runner.interval*1000);
                }
        }).catch(function(err) {
            utils.error(err);
        });
    }
};

co(run).catch(function(err) {
    utils.error(err);
});

