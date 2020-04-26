const db = require('../DB/db'),
    userModel = require('./userAPI/user.model'),
    statusModel = require('./statusAPI/getStatus.model')



module.exports.profile = (req, res) => {
    let userID = req.user.user_id;
    userModel.getUserById(userID, (err, user) => {
        statusModel.getPostByUser(userID, (err, post) => {
            console.log(post)
            res.render('profile.ejs', { user: user, post: post })
        })
    })
}

module.exports.uploadBg = (req, res) => {
    const userID = req.user.user_id,
        image = req.file.originalname;
    db.query('update user set user_background = "img/' + image + '" where user_id = "' + userID + '"', (err, rs) => {
        if (err) {
            throw err
        }
        res.redirect('/profile');
    })
}

module.exports.uploadAvatar = (req, res) => {
    const image = req.file.originalname,
        userID = req.user.user_id;
    db.query('update user set user_avatar = "img/' + image + '" where user_id = "' + userID + '"', (err, rs) => {
        if (err) {
            throw err
        }
        res.redirect('/profile');
    })
}

module.exports.updateProfile = (req, res) => {
    const newAddress = req.body.address_update,
        newGender = req.body.gender_update,
        newEmail = req.body.email_update,
        newBio = req.body.bio_update,
        userID = req.user.user_id

    db.query("update user set user_address = '" + newAddress + "',user_gender = '" + newGender + "',user_email = '" + newEmail + "',user_bio = '" + newBio + "' where user_id = '" + userID + "' ", (err, data) => {
        if (err) {
            throw err
        } else {
            res.redirect('/profile');
            return;
        }
    })
}