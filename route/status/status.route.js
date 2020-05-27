const route = express.Router(),
    multer = require('multer'),
    upload = multer({ dest: 'public/img/' })


const postModel = require('../../models/statusAPI/status.model');

route.post('/postStatus', upload.single('postImg'), postModel.postStatus)
route.get('/trashStatus/:postID', postModel.trashStatus);


module.exports = route;