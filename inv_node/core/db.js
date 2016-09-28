/**
 * Created by wp on 2016/9/27.
 */

var co = require('co');
var moment = require('moment');
var Datastore = require('nedb');
var wrap = require('co-nedb');
var config = require('./config');

var db = {};
var users = null;

db.init = function (path) {
    users = wrap(new Datastore({ filename: path, autoload: true }));
};

db.hasSend = function* (path) {
    var obj = yield users.findOne({ send: path });
    // console.log('hasSend', yield users.find({ }));
    if (obj && moment().diff(moment(obj.time), 'seconds') < config.default_sendMsgRate) {
        return true;
    }
    return false;
};

db.setSend = function* (path) {
    yield users.update({ send: path }, { send: path, time: moment().toDate() }, { upsert : true });
    // console.log('setSend', yield users.find({ }));
};

module.exports = db;
