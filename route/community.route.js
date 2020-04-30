const express = require('express');
const route = express.Router();

const comController = require('../controller/community.controller'),
    isLogged = require('../models/auth/isLogged');
route.get('/', isLogged, comController.community);

module.exports = route;