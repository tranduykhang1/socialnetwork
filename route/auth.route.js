const express = require('express'),
    route = express.Router(),
    flash = require('connect-flash'),
    app = express(),
    passport = require('passport');
app.use(flash());


const model = require('../models/auth/register.model'),
    authController = require('../controller/auth/auth.controller')
passportModel = require('../models/auth/passport');
passportModel(passport)

route.get('/', authController.login);
route.get('/register', authController.register);
route.get('/login', authController.logout);
route.post('/register', model.validRegister);



route.post('/login', passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true
}), (req, res) => {
    res.redirect('/home')
})

module.exports = route;