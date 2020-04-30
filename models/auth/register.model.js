const db = require('../../DB/db'),
    express = require('express'),
    flash = require('connect-flash'),
    bcrypt = require('bcrypt'),
    saltRounds = 10,
    app = express();

app.use(flash());

module.exports.validRegister = async(req, res) => {
    const first_name = req.body.first_name,
        last_name = req.body.last_name,
        username = req.body.username,
        email = req.body.email,
        password = req.body.password,
        gender = req.body.gender,
        birthday = req.body.birthday;

    const hashPassword = await bcrypt.hash(password, saltRounds)
    db.query('select user_username from user where user_username = "' + username + '"', (err, data) => {
        if (data[0]) {
            req.flash('validUsername', "Tài khoản đã tồn tại!!!");
            res.redirect('/register');
        } else {
            db.query("insert into user(user_firstname, user_lastname, user_username, user_password, user_email, user_gender, user_birthday, user_avatar, user_background) values" +
                "('" + first_name + "','" + last_name + "','" + username + "','" + hashPassword + "','" + email + "','" + gender + "','" + birthday + "','img/avatarDefault.png','img/backgroundDefault.jpg')", err => {
                    if (err) {
                        throw err
                    }
                    res.redirect('/')
                })
        }
    })
}