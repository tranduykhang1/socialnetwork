const db = require('../DB/db');


module.exports.profile = (req, res) => {
    const user = req.session.user;
    if (!req.session.loggedin) {
        res.redirect('/');
    } else {
        db.query('select * from user where user_username = ?', [user.user_username], (err, data) => {
            res.render('profile.ejs', { user: data[0] })

        })
    }
}