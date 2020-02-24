
var utils = require('./core/utils');
var config = require('./core/config');

utils.log('inv v1.0.0');

config.sendMsg = false;

//如果runner内没有指定该参数，使用以下默认参数
config.default_interval = 30; //默认每30秒触发一次所有runner
config.default_sendRate = 60 * 5; //默认符合条件时5分钟发一次Message

//run start

var assert = require('assert');
var co = require('co');
var sleep = require('co-sleep');
var fs = require('co-fs');
var db = require('./core/db');

var run = function* () {
    db.init('./runners.db');

    var runnerPath = './runners';
    var exists = yield fs.exists(runnerPath)
    if (exists) {
        var files = yield fs.readdir(runnerPath);
        for (var i = 0; i < files.length; i++) {
            co(function* () {
                var path = runnerPath + '/' + files[i];
                while (true) {
                    try {
                        var cls = require(path);
                        var runner = new cls();
                        var hasSend = yield db.hasSend(path, runner.sendRate);
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
                    yield sleep(runner.interval * 1000);
                }
            }).catch(function(err) {
                utils.error(err);
            });
        }
    }

    runnerPath = './runner_template';
    var exists = yield fs.exists(runnerPath)
    if (exists) {
        files = yield fs.readdir(runnerPath);
        for (var i = 0; i < files.length; i++) {
            var path = runnerPath + '/' + files[i];
            var cls = require(path);
            var runners = cls.getRunners();
            for (var j = 0; j < runners.length; j++) {
                co(function* () {
                    var runner = runners[j];
                    while (true) {
                        try {
                            var id = "template_" + runner._stockId;
                            var hasSend = yield db.hasSend(id, runner.sendRate);
                            log("check: " + id + ", hasSend: " + hasSend);
                            if (!hasSend) {
                                log("run: " + id);
                                var result = yield runner.run();
                                if (result) {
                                    log("send: " + id);
                                    yield db.setSend(id);
                                    runner.postMessage();
                                }
                            }
                        } catch (err) {
                            utils.error(err);
                        }
                        yield sleep(runner.interval * 1000);
                    }
                }).catch(function (err) {
                    utils.error(err);
                });
            }
        }
    }
};

co(run).catch(function(err) {
    utils.error(err);
});

var log = function (...args) {
    utils.log(...args);
};

