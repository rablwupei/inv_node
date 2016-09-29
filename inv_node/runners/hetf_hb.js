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
        return super.sendRate;
    }

    get touser() {
        return 'wupei'; //wupei|hanbihui
    }

    *run() {
        this._message = "";

        var sina = require('../markets/sina');
        var stocks = yield sina.get('hkHSCEI,sh510900,sz150176');
        var base = stocks[0];
        var basePercent = base.percent;
        var basePercent2 = basePercent * 2;
        var etf = stocks[1];
        var etfPercent = etf.percent;
        var hb = stocks[2];
        var hbPercent = hb.percent;

        var hbOffset = basePercent2 - hbPercent; //2 - 1    (-2) - (-1)
        var etfOffset = basePercent - etfPercent;

        var offsetMax = 0.005;

        if (Math.abs(hbOffset*0.5) > offsetMax || Math.abs(etfOffset) > offsetMax) {
            if (hbOffset > 0) { //hb便宜
                this._message = utils.sprintf('买入%s(%s)，偏离%.2f%%。',
                    hb.name, hb.percentStr, Math.abs(hbOffset * 100));
            } else if (hbOffset < 0) { //hb昂贵
                this._message = utils.sprintf('卖出%s(%s)，偏离%.2f%%。',
                    hb.name, hb.percentStr, Math.abs(hbOffset * 100));
            }
            if (etfOffset > 0) {
                this._message += utils.sprintf('买入%s(%s)，偏离%.2f%%。',
                    etf.name, etf.percentStr, Math.abs(etfOffset * 100));
            } else if (etfOffset < 0) {
                this._message += utils.sprintf('卖出%s(%s)，偏离%.2f%%。',
                    etf.name, etf.percentStr, Math.abs(etfOffset * 100));
            }
            this._message += utils.sprintf('%s(%s)', base.name, base.percentStr);
        }
        if (this._message) {
            return true;
        }
        return false;
    }

}

module.exports = Runner1;