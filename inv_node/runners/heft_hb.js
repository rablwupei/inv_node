/**
 * Created by wp on 2016/9/28.
 */

/**
 * Created by wupei on 16/9/25.
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

    get touser() {
        return '@all'; //wupei|hanbihui
    }

    *run() {
        this._message = "";
        var sina = require('../markets/sina');
        var stocks = yield sina.get('sh510900,sz150176');
        var etf = stocks[0];
        var hb = stocks[1];
        var offset = etf.percent * 2 - hb.percent;
        var offsetMax = 0.005;
        if (Math.abs(offset) > offsetMax) {
            if (etf.percent * 2 > hb.percent) {
                this._message = utils.sprintf('%s(%s)折价超过%.2f%%啦, %s(%s), 偏离%.2f%%',
                    hb.name, hb.percentStr, offsetMax * 100, etf.name, etf.percentStr, Math.abs(offset * 100));
            } else {
                // this._message = utils.sprintf('%s(%s)折价超过%.2f%%啦, %s(%s), 偏离%.2f%%',
                //     etf.name, etf.percentStr, offsetMax * 100, hb.name, hb.percentStr, Math.abs(offset * 100));
            }
        }
        if (this._message) {
            return true;
        }
        return false;
    }

}

module.exports = Runner1;