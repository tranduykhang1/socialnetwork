const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http'),
    flash = require('connect-flash'),
    passport = require('passport'),
    socketIo = require('socket.io'),
    server = app.listen(process.env.PORT || 8001),
    io = socketIo.listen(server);


app.use(flash());

const socket = require('./handleRealtime/chat.socket');
socket(io)
    //route
const loginRouter = require('./route/auth.route'),
    homeRouter = require('./route/home.route'),
    community = require('./route/community.route'),
    profile = require('./route/profile.route'),
    message = require('./route/message.route'),
    comment = require('./route/comment/comment.route'),
    searchUser = require('./route/searchUser/searchUser.route'),
    //api
    status = require('./route/status/status.route'),
    like = require('./route/like/like.route'),
    friendRequest = require('./route/friend/friend.route');

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
app.use('/', message);
app.use('/', status);
app.use('/', friendRequest);
app.use('/', comment);
app.use('/', searchUser);
app.use('/', like);