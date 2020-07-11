const express = require('express');
const route = express.Router();
const flash = require('connect-flash');
const app = express(),
    isLogged = require('../models/auth/isLogged');

app.use(flash());



const homeController = require('../controller/home.controller');
const userModel = require('../models/userAPI/user.model')

route.get('/home', isLogged, homeController.home)
route.get('/user_by_id', isLogged, homeController.user)
route.get('/recent_users', isLogged, userModel.recentUsers)

module.exports = route;