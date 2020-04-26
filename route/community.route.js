const express = require('express');
const route = express.Router();

const model = require('../models/community.model'),
    isLogged = require('../models/auth/isLogged');
route.get('/', isLogged, model.community);

module.exports = route;