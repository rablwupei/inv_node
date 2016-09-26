
var utils = require('./core/utils');
var config = require('./core/config');

utils.log('inv v1.0.0');

config.default_interval = 5;

var co = require('co');
co(function* () {
    var cls = require('./runners/runner1');
    var runner = new cls();
    yield runner.run();
}).catch(function(err) {
    utils.error(err);
});