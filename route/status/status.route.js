const route = express.Router(),
    multer = require('multer'),
    upload = multer({ dest: 'public/img/' })


const postModel = require('../../models/statusAPI/postStatus.model'),
    trashModel = require('../../models/statusAPI/trashStatus.model')

route.post('/postStatus', upload.single('postImg'), postModel)
route.get('/trashStatus/:postID', trashModel.trashStatus);


module.exports = route;