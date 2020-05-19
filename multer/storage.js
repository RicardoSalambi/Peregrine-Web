const multer = require('multer');
const path = require('path');



/*const storage*/ module.exports = multer.diskStorage({
    destination : './Uploads/files',
    filename    : (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname /*+   path.extname(file.originalname)*/);
    }
});