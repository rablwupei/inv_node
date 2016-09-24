/**
 * Created by wupei on 16/9/24.
 */

var inv = {};
var utils = require('./utils/utils');

inv.start = () => {
    if (!inv.init()) {
        return;
    }

    utils.log('inv v1.0.0');
};

inv.init = () => {
    var list = require('./list.json');
    if (!list) {
        utils.error('list not found.');
        return false;
    }



    return true;
};

module.exports = inv;
