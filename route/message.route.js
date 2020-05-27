const express = require('express'),
    route = express.Router(),
    flash = require('connect-flash'),
    app = express();
app.use(flash());

const messController = require('../controller/message.controller'),
    chatController = require('../controller/chat/chat.controller');
isLogged = require('../models/auth/isLogged');



route.get('/message', isLogged, messController.message);
route.get('/message/user/:user_id', chatController.currentUser)
route.get('/getMessage/:user_id', chatController.getMessage)
module.exports = route;