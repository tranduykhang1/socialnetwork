const route = express.Router(),
    likeModel = require('../../models/like/like.model');

route.post('/likeStatus', likeModel.likeStatus);
route.get('/countLike', likeModel.countLike);
route.get('/getAllLike', likeModel.getALlLike);

module.exports = route;