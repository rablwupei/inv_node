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
        if (Math.abs(offset) > 0.005) {
            if (etf.percent * 2 > hb.percent) {
                this._message = utils.sprintf("%s 折价超过0.5%啦,对标%s", hb.name, etf.name);
            } else {
                this._message = utils.sprintf("%s 折价超过0.5%啦,对标%s", etf.name, hb.name);
            }
        }
        if (this._message) {
            return true
        }
        return true;
    }

}

module.exports = Runner1;