const route = express.Router(),
    friendModel = require('../../models/friend/friend_req.model');

route.post('/friend_request', friendModel.friendRequest)
route.post('/cancel_request', friendModel.cancelRequest)
route.get('/list_request', friendModel.listRequests)
route.get('/list_friends', friendModel.listFriends)
route.get('/all_list_request', friendModel.allListRequests);
route.post('/accept_friend', friendModel.accept)
route.post('/denied_friend', friendModel.denied)


module.exports = route;