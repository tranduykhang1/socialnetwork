const route = express.Router();
const commentModel = require('../../models/statusAPI/comment.mode');

route.get('/getComment', commentModel.getComment)
route.post('/postComment', commentModel.postComment);
route.get('/getCountComment', commentModel.countComment);
module.exports = route;