/**
 * Created by wupei on 16/9/25.
 */

var util = require('util');
var utils = require('../core/utils');
var Message = require('./Message');
var config = require('./../core/config');

class AbstractRunner {

    constructor() {

    }

    get interval() {
        return config.default_interval;
    }

    get sendRate() {
        return config.default_sendRate;
    }

    get message() {
        return util.format('%s success', __filename);
    }

    get touser() {
        return '@all'; //wupei|hanbihui
    }

    postMessage() {
        if (config.sendMsg) {
            new Message(this).send();
        } else {
            utils.log("[debug] sendMsg: " + this.message)
        }
    }

    *run() {
        return false;
    }



}

module.exports = AbstractRunner