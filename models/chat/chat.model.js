const db = require('../../DB/db');

module.exports.getMessage = (sendUser, receiveUser, cb) => {
    db.query("SELECT * FROM `messages` where message_sendUser = '" + sendUser + "' and message_receiveUser = '" + receiveUser + "' " +
        "or message_sendUser = '" + receiveUser + "' and message_receiveUser = '" + sendUser + "'  ", (err, message) => {
            return cb(null, message)
        })
}
module.exports.insertMessage = (sendUser, receiveUser, message, time) => {
    db.query("INSERT INTO `messages` (`message_sendUser`, `message_receiveUser`, `message_content`, `message_time`) " +
        "VALUES ('" + sendUser + "', '" + receiveUser + "', '" + message + "', '" + time + "')")
}