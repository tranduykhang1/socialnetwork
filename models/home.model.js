const db = require('../DB/db')

module.exports.home = (req, res) => {
    const user = req.session.user;
    if (!req.session.loggedin) {
        res.redirect('/');
        return;
    } else {
        db.query('select * from user where user_username=?', [user.user_username], (err, rs) => {
            res.render('home.ejs', { user: rs[0] });
        })
    }
}