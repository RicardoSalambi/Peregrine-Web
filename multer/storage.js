const multer = require('multer');
const path = require('path');



/*const storage*/ module.exports = multer.diskStorage({
    destination : './Uploads',
    filename    : (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});