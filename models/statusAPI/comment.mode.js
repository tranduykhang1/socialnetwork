const db = require('../../DB/db');

module.exports.getComment = cb => {
    db.query('SELECT cmt.comment_id, cmt.comment_postID, cmt.comment_content, cmt.comment_day, u.user_firstname, u.user_lastname, u.user_avatar ' +
        'from comment as cmt, post, user as u where cmt.comment_postID = post.post_id and cmt.comment_userID = u.user_id order by comment_id desc', (err, result) => {
            return cb(null, result)
        })
}
module.exports.postComment = (req, res) => {
    let userID = req.body.idUser,
        postID = req.body.idPost,
        commentContent = req.body.content,
        commentDay = new Date();
    db.query("insert into comment(comment_userID, comment_postID, comment_content, comment_day) values" +
        "('" + userID + "','" + postID + "','" + commentContent + "','" + commentDay + "')", (err) => {
            if (err) {
                throw err
            }
        })
}

module.exports.countComment = (req, res) => {
    db.query('select comment_postID, count(comment_postID) as "countComment" from comment group by comment_postID', (err, result) => {
        if (err) {
            throw err
        }
        res.end(JSON.stringify(result));
    })
}