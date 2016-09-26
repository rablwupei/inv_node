
var fs = require('co-fs');
var co = require('co');
var assert = require('assert')

var utils = require('./core/utils');
var config = require('./core/config');

utils.log('inv v1.0.0');

config.default_interval = 5;

var run = function* () {
    var runnerPath = './runners';
    var files = yield fs.readdir(runnerPath);
    assert(files.length > 0, 'runners.length == 0');

    for (var i = 0; i < files.length; i++) {
        co(function* () {

            var cls = require(runnerPath + '/' + files[i]);
            var runner = new cls();
            var result = yield runner.run();
            if (result) {
                runner.postMessage();
            }

        }).catch(function(err) {
            utils.error(err);
        });
    }
};

co(run).catch(function(err) {
    utils.error(err);
});

