/**
 * Created by wp on 2016/11/23.
 */

var util = require('util');
var utils = require('../core/utils');
var AbstractRunner = require('../models/AbstractRunner');

class Runner1 extends AbstractRunner {

    constructor() {
        super();

    }

    get message() {
        return this._message;
    }

    get interval() {
        return 10;
    }

    get sendRate() {
        return 10;
    }


    get touser() {
        return 'wupei';
    }

    *run() {
        this._message = "";

        var sina = require('../markets/sina');
        var stocks = yield sina.get('sz000609');
        var base = stocks[0];
        var basePercent = base.percent;

        if (basePercent < 0.095) {
            this._message += utils.sprintf('开板啦!!! %s(%s)', base.name, base.percentStr);
        }
        var buy1lot = base.buy1lot / 100;
        if (buy1lot < 20000) {
            this._message += utils.sprintf('准备开板啦!!! %s(%s) 买1手数低于2w: %d', base.name, base.percentStr, buy1lot);
        }
        if (this._message) {
            return true;
        }
        return false;
    }

}

module.exports = Runner1;