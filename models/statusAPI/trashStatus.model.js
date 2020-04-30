const db = require('../../DB/db');


module.exports.trashStatus = async(req, res) => {
    let postID = req.params.postID
    db.query('delete from comment where comment_postID = ?', [postID], (err) => {
        if (err) {
            throw err
        } else {
            db.query('delete from post where post_id = ?', [postID], (err) => {
                if (err) {
                    throw err
                }
            })
        }
    })
}