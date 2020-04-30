const db = require('../../DB/db'),
    express = require('express'),
    flash = require('connect-flash'),
    app = express();

app.use(flash());

module.exports.login = (req, res) => {
    res.render('login/login.ejs', {
        errMsg: req.flash()
    })
}

module.exports.register = (req, res) => {
    res.render('login/register.ejs', {
        validUsername: req.flash('validUsername')
    });
}
module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/')
}