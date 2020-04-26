const express = require('express'),
    db = require('../DB/db'),
    route = express.Router(),
    multer = require('multer'),
    isLogged = require('../models/auth/isLogged');


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
route.get('/', isLogged, model.profile);

route.post('/uploadBg', upload.single('backgroundProfile'), model.uploadBg);
route.post('/uploadAvatar', upload.single('avatarProfile'), model.uploadAvatar);
route.post('/updateProfile', model.updateProfile);

module.exports = route;