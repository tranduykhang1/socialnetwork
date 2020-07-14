const db = require('../../DB/db');

module.exports.friendRequest = (req, res) => {
    let send = req.body.sendUser,
        receive = req.body.receiveUser;
    db.query("INSERT INTO friend_req (fReq_sendUser, fReq_receiveUser) values ('" + send + "','" + receive + "')", (err, rs) => {
        if (err) {
            res.status(400).json("Cant send request")
        } else {
            res.status(200).json("Send success!")
        }
    })
}
let cancel = (send, receive, cb) => {
    db.query("DELETE FROM friend_req where fReq_sendUser ='" + send + "' and fReq_receiveUser ='" + receive + "' ", (err, rs) => {
        if (err) {
            return cb(err)
        }
        return cb(null, rs)
    })
}

module.exports.cancelRequest = (req, res) => {
    let send = req.body.sendUser,
        receive = req.body.receiveUser;
    cancel(send, receive, (err, rs) => {
        if (err) {
            res.status(400).json("Cant cancel request")
        }
        return res.status(200).json("Cancel success!")
    })
}
module.exports.listRequests = (req, res) => {
    db.query('SELECT * FROM friend_req', (err, rs) => {
        res.status(200).json(rs)
    })
}
module.exports.allListRequests = (req, res) => {
    db.query('SELECT user_id, user_lastname, user_firstname, fReq_sendUser, fReq_receiveUser FROM user, friend_req WHERE user_id = fReq_sendUser', (err, rs) => {
        res.status(200).json(rs)
    })
}


module.exports.accept = (req, res) => {
    let send = req.body.receiveUser,
        receive = req.body.sendUser;
    cancel(send, receive, (err, rs) => {
        if (err) {
            return res.json("Handle accept fail")
        }
        db.query("INSERT INTO friend (friend_user1, friend_user2) values ('" + send + "','" + receive + "')", (err, rs) => {
            if (rs) {
                res.status(200).json("Add friend success")
            }
        })
    })
}
module.exports.denied = (req, res) => {
    let send = req.body.receiveUser,
        receive = req.body.sendUser;
    cancel(send, receive, (err, rs) => {
        if (err) {
            return res.status(400).json("Cant cancel request")
        }
        return res.status(200).json("Cancel success!")
    })
}
module.exports.listFriends = (req, res) => {
    db.query('SELECT user_id, user_avatar, user_lastname, user_firstname, friend_id, friend_user1, friend_user2 FROM friend, user where user_id = friend_user1 or user_id = friend_user2 group by user_id', (err, rs) => {
        res.status(200).json(rs)
    })
}