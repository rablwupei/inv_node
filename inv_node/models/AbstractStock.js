/**
 * Created by wp on 2016/9/26.
 */

var util = require('util');
var sprintf = require("sprintf-js").sprintf

class AbstractStock {
    constructor() {

    }

    get name() {
        throw new Error('not implement.');
    }

    get time() {
        throw new Error('not implement.');
    }

    get cur() {
        throw new Error('not implement.');
    }

    get high() {
        throw new Error('not implement.');
    }

    get low() {
        throw new Error('not implement.');
    }

    get open() {
        throw new Error('not implement.');
    }

    get close() {
        throw new Error('not implement.');
    }

    /** 涨跌幅 */
    get percent() {
        return (this.cur / this.close - 1);
    }

    toString() {
        return sprintf("%s 当前:%f(%.2f%%) 最高:%f 最低:%f 时间:%s",
            this.name, this.cur, this.percent * 100, this.low, this.high, this.time);
    }

}

module.exports = AbstractStock;