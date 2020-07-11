const db = require('../../DB/db')

module.exports.getUserById = (user_id, cb) => {
    db.query('select * from user where user_id = "' + user_id + '"', (err, data) => {
        if (err) {
            return cb(new Error("Err"))
        }
        return cb(null, data[0]);
    })
}

module.exports.getAllUsers = cb => {
    db.query('select * from user', (err, data) => {
        return cb(null, data)
    })
}

module.exports.recentUsers = (req, res) => {
    db.query('select * from user', (err, data) => {
        return res.json(data)
    })
}
module.exports.searchUser = (name, cb) => {
    db.query("SELECT * FROM user WHERE CONCAT( user_firstname,  ' ', user_lastname ) LIKE  '%" + name + "%' ", (err, result) => {
        if (err) {
            return cb(new Error())
        }
        return cb(null, result);
    })
}

//
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

module.exports.userOnline = (userId) => {
    db.query('update user set user_status = "online" where user_id = "' + userId + '"', (err, result) => {
        if (err) {
            throw err
        }
    })
}

module.exports.userOffline = (userId) => {
    db.query('update user set user_status = "offline" where user_id = "' + userId + '"')
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