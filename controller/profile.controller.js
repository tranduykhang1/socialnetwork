const db = require('../DB/db'),
    userModel = require('../models/userAPI/user.model'),
    statusModel = require('../models/statusAPI/getStatus.model'),
    commentModel = require('../models/statusAPI/comment.mode');



module.exports.profile = (req, res) => {
    let userID = req.user.user_id;
    userModel.getUserById(userID, (err, user) => {
        statusModel.getPostByUser(userID, (err, post) => {
            commentModel.getComment((err, comment) => {
                res.render('profile.ejs', { user: user, post: post, comment: comment })
            })
        })
    })
}