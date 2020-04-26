const route = express.Router(),
    multer = require('multer'),
    upload = multer({ dest: 'public/img/' })




const Postmodel = require('../../models/statusAPI/postStatus.model');


route.post('/postStatus', upload.single('postImg'), Postmodel)

module.exports = route;