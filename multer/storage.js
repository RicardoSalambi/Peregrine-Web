const multer = require('multer');
const path = require('path');



const filestorage =  multer.diskStorage({
    destination : './Uploads/files',
    filename    : (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname /*+   path.extname(file.originalname)*/);
    }
});


module.exports = {
    filestorage
}