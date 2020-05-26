const multer = require('multer');
const {filestorage} = require('./storage');



/*const filesingle*/module.exports = multer ({
    storage : filestorage
}).fields([
    {   name: 'file', maxCount: 1   }, 
    {   name: 'imgfile', maxCount: 1  }
]);//.single('file');

// module.exports = {
//     filesingle
// }