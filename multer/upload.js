const multer = require('multer');
const /*{ filestorage, imgstorage }*/storage = require('./storage');



/*const filesingle*/ module.exports = multer ({
    storage : storage
}).single('file');



const imgsingle = multer ({
    storage : imgstorage
}).single('imgfile');



/*module.exports = {
    filesingle,
    imgsingle
}*/