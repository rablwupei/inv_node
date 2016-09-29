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

    get sendRate() {
        return 60;
    }

    get touser() {
        return 'wupei'; //wupei|hanbihui
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
            if (etf.percent > 0 && hb.percent > 0) {
                if (etf.percent * 2 > hb.percent) {   //(2%, 4%, 2.5%)
                    this._message = utils.sprintf('卖出%s(%s)，买入%s(%s)，折价%.2f%%',
                        etf.name, etf.percentStr, hb.name, hb.percentStr, Math.abs(offset * 100));
                } else {  //(0.5%, 1%, 2.5%)
                    this._message = utils.sprintf('卖出%s(%s)，买入%s(%s)，折价%.2f%%',
                        hb.name, hb.percentStr, etf.name, etf.percentStr, Math.abs(offset * 100));
                }
            } else if (etf.percent < 0 && hb.percent < 0) {
                if (etf.percent * 2 > hb.percent) {   //(-0.5%, -1%, -2.5%)
                    this._message = utils.sprintf('卖出%s(%s)，买入%s(%s)，折价%.2f%%',
                        etf.name, etf.percentStr, hb.name, hb.percentStr, Math.abs(offset * 100));
                } else {   //(-2%, -4%, -2.5%)
                    this._message = utils.sprintf('卖出%s(%s)，买入%s(%s)，折价%.2f%%',
                        hb.name, hb.percentStr, etf.name, etf.percentStr, Math.abs(offset * 100));
                }
            }
        }
        if (this._message) {
            return true;
        }
        return false;
    }

}

module.exports = Runner1;