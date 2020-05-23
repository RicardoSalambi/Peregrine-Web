const multer = require('multer');
const path = require('path');



/*const filestorage*/ module.exports = multer.diskStorage({
    destination : './Uploads/files',
    filename    : (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname /*+   path.extname(file.originalname)*/);
    }
});


const imgstorage = multer.diskStorage({
    destination : './Uploads/imgs',
    filename    : (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname /*+   path.extname(file.originalname)*/);
    }
});


/*module.exports = {
    filestorage,
    imgstorage
}*/