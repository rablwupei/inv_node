/**
 * Created by wupei on 2016/12/13.
 */


var util = require('util');
var utils = require('../core/utils');
var AbstractRunner = require('../models/AbstractRunner');

class StockMonitoring extends AbstractRunner {

    constructor(param) {
        super();

        this._stockId = param.stockId;
        this._price = param.price;
    }

    get message() {
        return this._message;
    }

    get interval() {
        return 5;
    }

    get sendRate() {
        return 5;
    }


    get touser() {
        return 'wupei';
    }

    *run() {
        this._message = "";

        var sina = require('../markets/sina');
        var stocks = yield sina.get(this._stockId);
        var base = stocks[0];
        var basePercent = base.percent;

        if (base.cur <= this._price) {
            this._message += utils.sprintf('触发：%s(%s) %f <= %f', base.name, base.percentStr, base.cur, this._price);
        }
        if (this._message) {
            return true;
        }
        return false;
    }

    static getRunners() {
        return [
            new StockMonitoring({stockId: "sh600886", price: 6.5}),
            new StockMonitoring({stockId: "sh600546", price: 3.75}),
            new StockMonitoring({stockId: "sz000968", price: 8.98}),
            new StockMonitoring({stockId: "sh601918", price: 3.98}),
            new StockMonitoring({stockId: "sh601818", price: 3.91}),
        ];
    }

}

module.exports = StockMonitoring;