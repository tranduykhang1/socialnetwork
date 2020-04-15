const express = require('express');
const route = express.Router();
const flash = require('connect-flash');
const app = express();
app.use(flash());

const model = require('../models/message.model');


route.get('/', model.message);

module.exports = route;