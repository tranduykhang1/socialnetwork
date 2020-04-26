const express = require('express'),
    route = express.Router(),
    flash = require('connect-flash'),
    app = express();
app.use(flash());

const model = require('../models/message.model'),
    isLoggedd = require('../models/auth/isLogged');



route.get('/', isLoggedd, model.message);

module.exports = route;