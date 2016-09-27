
var fs = require('co-fs');
var co = require('co');
var sleep = require('co-sleep')
var assert = require('assert')

var utils = require('./core/utils');
var config = require('./core/config');

utils.log('inv v1.0.0');

config.default_interval = 5; //秒
config.debug = true;
config.sendMsg = true;

var moment = require('moment');
var _hasSend = {};
var hasSend = function (key) {
    var mo = _hasSend[key];
    if (mo && !mo.diff(moment(), 'days')) {
        return true;
    }
    return false;
};

var setSend = function (key) {
    _hasSend[key] = moment();
};

var log = function (...args) {
    if (config.debug) {
        utils.log(...args);
    }
};

var run = function* () {
    var runnerPath = './runners';
    var files = yield fs.readdir(runnerPath);
    assert(files.length > 0, 'runners.length == 0');

    for (var i = 0; i < files.length; i++) {
        co(function* () {
            var path = runnerPath + '/' + files[i];
            while (true) {
                var cls = require(path);
                log("check: " + path);
                var runner = new cls();
                if (!hasSend(path)) {
                    log("run: " + path);
                    var result = yield runner.run();
                    if (result) {
                        log("send: " + path);
                        setSend(path);
                        runner.postMessage();
                    }
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

