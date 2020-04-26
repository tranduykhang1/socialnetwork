const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    app = express(),
    flash = require('connect-flash'),
    passport = require('passport');
app.use(flash());


//
//route
const loginRouter = require('./route/auth.route'),
    homeRouter = require('./route/home.route'),
    community = require('./route/community.route'),
    profile = require('./route/profile.route'),
    message = require('./route/message.route'),
    comment = require('./route/comment/comment.route'),
    searchUser = require('./route/searchUser/searchUser.route');
//api
status = require('./route/status/postStatus.route')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/', loginRouter);
app.use('/', homeRouter);
app.use('/community', community);
app.use('/profile', profile);
app.use('/message', message);
app.use('/', status);

app.use('/', comment);
app.use('/', searchUser);


app.listen(8001);