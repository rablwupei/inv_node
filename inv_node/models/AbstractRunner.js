/**
 * Created by wupei on 16/9/25.
 */

var util = require('util');
var Message = require('./Message');
var config = require('./../core/config');

class AbstractRunner {

    constructor() {

    }

    get interval() {
        return config.default_interval;
    }

    get message() {
        return util.format('%s success', __filename);
    }

    get touser() {
        return '@all';
    }

    postMessage() {
        new Message(this).send();
    }

    *run() {
        return false;
    }



}

module.exports = AbstractRunner