const express = require('express');
const route = express.Router();

const model = require('../models/community.model');
route.get('/', model.community);

module.exports = route;