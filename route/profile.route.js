const express = require('express'),
    db = require('../DB/db'),
    route = express.Router(),
    multer = require('multer');


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })



const model = require('../models/profile.model');
route.get('/', model.profile);
route.post('/uploadBg', upload.single('backgroundProfile'), (req, res) => {
    const image = req.file.originalname;
    const userID = req.session.user.user_id
    db.query('update user set user_background = "img/' + image + '" where user_id = "' + userID + '"', (err, rs) => {
        if (err) {
            throw err
        }
        res.redirect('/profile');
    })

})
route.post('/uploadBg', upload.single('backgroundProfile'), (req, res) => {
    const image = req.file.originalname;
    const userID = req.session.user.user_id
    db.query('update user set user_background = "img/' + image + '" where user_id = "' + userID + '"', (err, rs) => {
        if (err) {
            throw err
        }
        res.redirect('/profile');
    })

})

route.post('/uploadAvatar', upload.single('avatarProfile'), (req, res) => {
    const image = req.file.originalname,
        userID = req.session.user.user_id;
    db.query('update user set user_avatar = "img/' + image + '" where user_id = "' + userID + '"', (err, rs) => {
        if (err) {
            throw err
        }
        res.redirect('/profile');
    })

})
module.exports = route;