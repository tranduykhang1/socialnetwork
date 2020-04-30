const route = express.Router();
const searchController = require('../../controller/searchUser/searchUser.controller');

route.get('/search', searchController.search)
module.exports = route;