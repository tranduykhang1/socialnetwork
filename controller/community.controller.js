const userModel = require('../models/userAPI/user.model');

module.exports.community = (req, res) => {
    let userID = req.user.user_id;
    userModel.getAllUsers((err, users) => {
        userModel.getUserById(userID, (err, user) => {
            res.render('community', { user: user, users: users });
        })
    })
}