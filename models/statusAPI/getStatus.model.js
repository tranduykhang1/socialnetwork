const db = require('../../DB/db');

module.exports.getAllPost = cb => {
    db.query('SELECT post.post_id, post.post_content, post.post_image, post.post_day, user.user_firstname' +
        ',user.user_lastname, user.user_avatar FROM post,user WHERE post_userID = user_id order by post.post_id desc', (err, result) => {
            if (err) {
                return cb(new Error())
            }
            return cb(null, result)
        })
}

module.exports.getPostByUser = (userID, cb) => {
    db.query("select post_id, post_content, post_image, post_day, user_lastname, user_firstname, user_avatar" +
        " from post,user where post_userID = user_id and user_id = ?", userID, (err, result) => {
            if (err) {
                return cb(new Error())
            }
            return cb(null, result)
        })
}