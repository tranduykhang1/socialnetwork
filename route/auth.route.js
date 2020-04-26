const express = require('express'),
    route = express.Router(),
    flash = require('connect-flash'),
    app = express(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require('../DB/db'),
    bcrypt = require('bcrypt');
app.use(flash());


const model = require('../models/auth/auth.model');
passportModel = require('../models/auth/passport');
passportModel(passport)

route.get('/', model.login);
route.get('/resgister', model.resgister);
route.get('/login', model.logout);
route.post('/resgister', model.validResgister);



route.post('/login', passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true
}), (req, res) => {
    res.redirect('/home')
})

module.exports = route;