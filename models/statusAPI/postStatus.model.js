const db = require('../../DB/db');

module.exports = (req, res) => {
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