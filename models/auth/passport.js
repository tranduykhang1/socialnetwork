const db = require('../../DB/db'),
    bcrypt = require('bcrypt'),
    LocalStrategy = require('passport-local').Strategy,
    flash = require('connect-flash');
express = require('express');
app = express();
app.use(flash());

module.exports = passport => {

    passport.serializeUser(function(user, done) {
        return done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        return done(null, user)
    });
    passport.use('local', new LocalStrategy(
        function(username, password, done) {
            db.query('select * from user where user_username = "' + username + '"', async(err, user) => {
                if (user.length > 0) {
                    await bcrypt.compare(password, user[0].user_password, (err, isMatch) => {
                        if (isMatch) {
                            return done(null, user[0])
                        }
                        return done(null, false, { message: "Sai mật khẩu!!!" })
                    })
                } else {
                    return done(null, false, { message: "Sai tên đăng nhập!!!" })
                }
            })
        }
    ))

}