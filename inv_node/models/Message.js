/**
 * Created by wupei on 16/9/25.
 */

class Message {

    constructor(runner) {
        this.message = runner.message;
        this.touser = runner.touser;
    }

    send() {
        var weixin = require('../core/weixin')
        weixin.send(this);
    }

}

module.exports = Message;