const route = express.Router(),
    likeModel = require('../../models/like/like.model');

route.post('/likeStatus', likeModel.likeStatus);
route.get('/countLike', likeModel.countLike);

module.exports = route;