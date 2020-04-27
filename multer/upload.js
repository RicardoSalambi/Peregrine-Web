const multer = require('multer');
const storage = require('./storage');



/*const upload*/ module.exports = multer ({
    storage : storage
}).single('file');