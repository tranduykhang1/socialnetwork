const db = require('../../DB/db')

module.exports.getUserById = (user_id, cb) => {
    db.query('select * from user where user_id = "' + user_id + '"', (err, data) => {
        if (err) {
            return cb(new Error("Err"))
        }
        return cb(null, data[0]);
    })
}

module.exports.getAllUsers = cb => {
    db.query('select * from user', (err, data) => {
        return cb(null, data)
    })
}
module.exports.searchUser = (name, cb) => {
    db.query("SELECT * FROM user WHERE CONCAT( user_firstname,  ' ', user_lastname ) LIKE  '%" + name + "%' ", (err, result) => {
        if (err) {
            return cb(new Error())
        }
        return cb(null, result);
    })
}