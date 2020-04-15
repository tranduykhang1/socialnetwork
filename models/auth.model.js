const db = require('../DB/db'),
    express = require('express'),
    flash = require('connect-flash'),
    bcrypt = require('bcrypt'),
    saltRounds = 10,
    app = express()
app.use(flash());


module.exports.login = (req, res) => {
    res.render('login/login.ejs', {
        errMsg: req.flash('loginfail')
    })
}

module.exports.resgister = (req, res) => {
    res.render('login/resgister.ejs', {
        validUsername: req.flash('validUsername')
    });
}
module.exports.logout = async(req, res) => {
    await req.session.detroy;
    res.render('login/login.ejs', { errMsg: "" });
}


module.exports.validResgister = async(req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;


    const hashpassowrd = await bcrypt.hash(password, saltRounds)
    db.query('select user_username from user where user_username = "' + username + '"', (err, data) => {
        if (data[0]) {
            req.flash('validUsername', "Tài khoản đã tồn tại!!!");
            res.redirect('/resgister');
        } else {
            db.query("insert into user(user_firstname, user_lastname, user_username, user_password, user_email, user_avatar, user_background) values" +
                "('" + first_name + "','" + last_name + "','" + username + "','" + hashpassowrd + "','" + email + "','img/avatarDefault.png','img/backgroundDefault.jpg')", err => {
                    if (err) {
                        throw err
                    }
                    res.redirect('/')
                })
        }
    })
}

module.exports.validLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query('select * from user where user_username=?', [username],
        async(err, rs) => {
            if (rs.length > 0) {
                await bcrypt.compare(password, rs[0].user_password, (err, hash) => {
                    if (hash) {
                        req.session.user = rs[0];
                        req.session.loggedin = true;
                        res.redirect('/home');
                    } else {
                        req.flash("loginfail", "Mật khẩu không khớp");
                        return res.redirect('/')
                    }
                })
            } else {
                req.flash('loginfail', "Sai tên đăng nhập hoặc mật khẩu")
                return res.redirect('/')
            }

        })
}