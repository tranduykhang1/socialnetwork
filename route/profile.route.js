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



const profileController = require('../controller/profile.controller');
const updateUserModel = require('../models/userAPI/user.model')
route.get('/', isLogged, profileController.profile);

route.post('/uploadBg', upload.single('backgroundProfile'), updateUserModel.uploadBg);
route.post('/uploadAvatar', upload.single('avatarProfile'), updateUserModel.uploadAvatar);
route.post('/updateProfile', updateUserModel.updateProfile);

module.exports = route;