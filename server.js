const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    app = express(),
    flash = require('connect-flash')

//route
const loginRouter = require('./route/auth.route'),
    homeRouter = require('./route/home.route'),
    community = require('./route/community.route'),
    profile = require('./route/profile.route'),
    message = require('./route/message.route')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/', loginRouter);
app.use('/', homeRouter);
app.use('/community', community);
app.use('/profile', profile);
app.use('/message', message);


app.listen(8001);