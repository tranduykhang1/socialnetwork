const express = require('express');
const route = express.Router();
const flash = require('connect-flash');
const app = express(),
    isLogged = require('../models/auth/isLogged');

app.use(flash());



const model = require('../models/home.model');

route.get('/home', isLogged, model.home)

module.exports = route;