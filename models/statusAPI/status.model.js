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

module.exports.getStatusByUser = (userID, cb) => {
    db.query("select post_id, post_content, post_image, post_day, user_lastname, user_firstname, user_avatar" +
        " from post,user where post_userID = user_id and user_id = ?", userID, (err, result) => {
            if (err) {
                return cb(new Error())
            }
            return cb(null, result)
        })
}

module.exports.postStatus = (req, res) => {
    var postImg;
    if (!req.file) {
        postImg = "";
    } else {
        postImg = req.file.originalname;
    }

    let postContent = req.body.postContent,
        postDay = new Date(),
        userID = req.user.user_id

    db.query("insert into post(post_content, post_image, post_day, post_userID) values " +
        "('" + postContent + "','" + postImg + "','" + postDay + "','" + userID + "')", (err) => {
            if (err) {
                throw err
            } else {
                req.flash('postSuccess', "Đã đăng 1 bài viết mới");
                return res.redirect('/home');
            }
        })
}

module.exports.trashStatus = async(req, res) => {
    let postID = req.params.postID
    deleteComment(postID, (err, res) => {
        if (err) {
            throw err
        }
        deleteLike(postID, (err, res) => {
            if (err) {
                throw err
            }
            db.query('delete from post where post_id = ?', [postID], (err) => {
                if (err) {
                    throw err
                }
            })
        })

    })
}

let deleteComment = (postID, cb) => {
    db.query('delete from comment where comment_postID = ?', [postID], (err, res) => {
        if (err) {
            return cb(new Error())
        }
        return cb(null, true)
    })
}
let deleteLike = (postID, cb) => {
    db.query('delete from _like where like_postID = ?', postID, (err, res) => {
        if (err) {
            return cb(new Error)
        }
        return cb(null, true)
    })
}