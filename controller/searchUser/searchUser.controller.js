const db = require('../../DB/db'),
    userModel = require('../../models/userAPI/user.model');

module.exports.search = (req, res) => {
    let username = req.query.q;
    userModel.getUserById(req.user.user_id, (err, user) => {
        userModel.searchUser(username, (err, searchRes) => {
            res.render('community', { user: user, users: searchRes })
        })
    })
}