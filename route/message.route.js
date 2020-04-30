const express = require('express'),
    route = express.Router(),
    flash = require('connect-flash'),
    app = express();
app.use(flash());

const messController = require('../controller/message.controller'),
    isLogged = require('../models/auth/isLogged');



route.get('/', isLogged, messController.message);

module.exports = route;