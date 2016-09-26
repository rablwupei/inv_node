/**
 * Created by wupei on 16/9/25.
 */

var utils = require('./../core/utils');
var Message = require('./../core/Message')
var config = require('./../core/config')

class AbstractRunner {

    constructor() {

    }

    get interval() {
        return config.default_interval;
    }

    *run() {

    }

}

module.exports = AbstractRunner