/**
 * Created by wupei on 16/9/25.
 */

var util = require('util');
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
        var stocks = yield sina.get('sz131810,sz131811,sz131800,sz131809,sz131801,sz131802,sz131803,sz131805,sz131806');
        for (var i = 0; i < stocks.length; i++) {
            var stock = stocks[i];
            if (stock.cur > 3) {
                if (this._message) {
                    this._message = this._message + '\n' + stock.toString();
                } else {
                    this._message = stock.toString();
                }
            }
        }
        if (this._message) {
            return true
        }
        return false;
    }

}

module.exports = Runner1;