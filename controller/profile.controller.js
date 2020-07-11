const userModel = require('../models/userAPI/user.model'),
    statusModel = require('../models/statusAPI/status.model'),
    commentModel = require('../models/statusAPI/comment.mode');



module.exports.profile = (req, res) => {
    let userID = req.user.user_id;
    userModel.getUserById(userID, (err, user) => {
        statusModel.getStatusByUser(userID, (err, post) => {
            commentModel.getComment((err, comment) => {
                res.render('profile.ejs', { user: user, post: post, comment: comment, isDelete: true, isUser: true })
            })
        })
    })
}

module.exports.userProfile = (req, res) => {
    let userID = req.params.user
    userModel.getUserById(userID, (err, user) => {
        console.log(user)
        statusModel.getStatusByUser(userID, (err, post) => {
            commentModel.getComment((err, comment) => {
                res.render('profile.ejs', { user: user, post: post, comment: comment, isDelete: false, isUser: false })
            })
        })
    })
}