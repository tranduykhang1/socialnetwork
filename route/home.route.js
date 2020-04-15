const express = require('express');
const route = express.Router();
const flash = require('connect-flash');
const app = express();
app.use(flash());

const model = require('../models/home.model');


route.get('/home', model.home)

module.exports = route;