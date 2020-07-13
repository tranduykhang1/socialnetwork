const userModel = require('../models/userAPI/user.model'),
    getStatus = require('../models/statusAPI/status.model'),
    getComment = require('../models/statusAPI/comment.mode');

module.exports.home = (req, res) => {
    let userID = req.user.user_id;
    let message = req.flash('postSuccess')
    userModel.getUserById(userID, (err, user) => {
        getStatus.getAllPost((err, post) => {
            getComment.getComment((err, comment) => {
                res.render('home', { currentUser: user, user: user, post: post, comment: comment, postSuccess: message, isDelete: false, isUser: true });
            })
        })
    })
}
module.exports.user = (req, res) => {
    let userID = req.user.user_id
    userModel.getUserById(userID, (err, user) => {
        res.json(user)
    })
}