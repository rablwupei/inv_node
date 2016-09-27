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
        return util.format('%s success', __filename);
    }

    get touser() {
        return 'wupei'; //'@all';
    }

    *run() {
        var sina = require('../markets/sina');
        var stocks = yield sina.get('sh601006,sh601005');
        console.log(stocks[0].toString());
        console.log(stocks[1].toString());
        return false;
    }

}

module.exports = Runner1;