/**
 * Created by wupei on 16/9/25.
 */

var utils = require('../utils/utils');
var Message = require('./Message')

class AbstractRunner {

    constructor() {

    }

    get interval() {
        utils.log('AbstractRunner interval = %d', 1);
        return 5;
    }

    run() {

    }

    postMessage(msg) {
        new Message(msg).send();
    }

}

module.exports = AbstractRunner