const express = require('express');
const route = express.Router();
const flash = require('connect-flash');
const app = express(),
    isLogged = require('../models/auth/isLogged');

app.use(flash());



const homeController = require('../controller/home.controller');

route.get('/home', isLogged, homeController.home)

module.exports = route;