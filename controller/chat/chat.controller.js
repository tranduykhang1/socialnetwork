const userModel = require('../../models/userAPI/user.model'),
    messageModel = require('../../models/chat/chat.model');

module.exports.currentUser = (req, res) => {
    let userID = req.params.user_id
    userModel.getUserById(userID, (err, user) => {
        if (err) {
            return err
        }
        user = JSON.stringify(user)
        res.end(user);
    })
}
module.exports.getMessage = (req, res) => {
    let sendUser = req.user.user_id,
        receiveUser = req.params.user_id;
    messageModel.getMessage(sendUser, receiveUser, (err, message) => {
        res.end(JSON.stringify(message))
    })
}