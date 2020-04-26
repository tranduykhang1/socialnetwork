const userModel = require('./userAPI/user.model');


module.exports.message = async(req, res) => {
    let userID = req.user.user_id;
    userModel.getAllUsers((err, users) => {
        userModel.getUserById(userID, (err, user) => {
            res.render('message', { user: user, users: users })
        })
    })
}