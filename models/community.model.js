const db = require('../DB/db'),
    express = require('express'),
    flash = require('connect-flash'),
    app = express()


module.exports.community = (req, res) => {
    res.render('community');
}