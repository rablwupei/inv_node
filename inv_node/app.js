
var fs = require('co-fs');
var co = require('co');
var sleep = require('co-sleep')
var assert = require('assert')

var utils = require('./core/utils');
var config = require('./core/config');

utils.log('inv v1.0.0');

config.default_interval = 5; //秒
config.debug = true;

var hasSend = {};

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
        log("start file: " + files[i]);
        co(function* () {
            var path = runnerPath + '/' + files[i];
            while (true) {
                var cls = require(path);
                log("ready: " + path);
                var runner = new cls();
                if (!hasSend[path]) {
                    log("start: " + path);
                    var result = yield runner.run();
                    if (result) {
                        log("success: " + path);
                        hasSend[path] = true;
                        runner.postMessage();
                    }
                }
                yield sleep(runner.interval*1000);
            }
        }).catch(function(err) {
            utils.error(err);
        });
        log("end file: " + files[i]);
    }
};

co(run).catch(function(err) {
    utils.error(err);
});

