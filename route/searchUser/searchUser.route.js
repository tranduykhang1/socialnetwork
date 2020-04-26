const route = express.Router();
const searchModel = require('../../models/searchUser/searchUser.model');

route.get('/search', searchModel.search)
module.exports = route;