const express = require('express');
const route = express.Router();
const flash = require('connect-flash');
const app = express();
app.use(flash());


const model = require('../models/auth.model');

route.get('/', model.login);
route.get('/resgister', model.resgister);
route.get('/login', model.logout);
route.post('/resgister', model.validResgister);
route.post('/login', model.validLogin)

module.exports = route;