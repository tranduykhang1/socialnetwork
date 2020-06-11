const route = express.Router(),
    multer = require('multer');


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


const postModel = require('../../models/statusAPI/status.model');

route.post('/postStatus', upload.single('postImg'), postModel.postStatus)
route.get('/trashStatus/:postID', postModel.trashStatus);


module.exports = route;