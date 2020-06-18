const db = require('../../DB/db');

module.exports.likeStatus = (req, res) => {
    let userLike = req.body.userLike,
        postLike = req.body.postLike;
    getLikeByUser(userLike, postLike, (err, data) => {
        if (data.length) {
            deleteLike(userLike, postLike)
        } else {
            insertLike(userLike, postLike);
        }
    })
}
module.exports.countLike = (req, res) => {
    db.query("SELECT count(like_postID) as 'countLike', like_postID, like_userID, like_id from _like GROUP BY like_postID", (err, data) => {
        res.end(JSON.stringify(data));
    })
}
module.exports.getALlLike = (req, res) => {
    db.query("SELECT * FROM _like", (err, data) => {
        res.end(JSON.stringify(data))
    })
}


let getLikeByUser = (userID, postID, cb) => {
    db.query("select * from _like where like_userID = '" + userID + "' and like_postID = '" + postID + "'  ", (err, data) => {
        if (err) {
            return cb(new Error("Err"))
        }
        return cb(null, data);
    })
}
let insertLike = (userID, postID) => {
    db.query("INSERT INTO `_like` (`like_postID`, `like_userID`, `like_status`) VALUES ('" + postID + "', '" + userID + "', 'active')")
}
let deleteLike = (userID, postID) => {
    db.query("delete from _like where like_userID = '" + userID + "' and like_postID = '" + postID + "'")
}