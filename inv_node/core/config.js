/**
 * Created by wp on 2016/9/26.
 */

var config = {};

config.debug = true;
config.default_interval = 10; //每10秒触发一次所有runner
config.default_sendRate = 60 * 5; //符合条件时5分钟发一次Message
config.sendMsg = false;

module.exports = config;