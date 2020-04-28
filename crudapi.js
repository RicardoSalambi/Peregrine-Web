const express = require('express');
const model = require('./sequelize/model')
const upload = require('./multer/upload')

const fs = require('fs');


function createRouter(db) 
{
  const router = express.Router();
  const owner = '';

//*******************************************************************************
  router.get('/' , (req, res, next) => {
    res.sendStatus(200); 
  });
//*******************************************************************************

//*******************************************************************************
  router.post('/add', (req,res) =>{

    upload(req, res, (err) => {
      
        if(err)
        {

        }
        else 
        {
            console.log(req.file);

            model.create({
              File  : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename)
            }).then((file) =>{

              fs.unlink(__basedir + '/Uploads/' + req.file.filename, (err) => {
                if (err) throw err;
                console.log(`${__basedir + '/Uploads/' + req.file.filename} was Removed !`);
              });
              
              res.sendStatus(200); 
            })
            
            /*.then(image => {
              try
              {
                fs.writeFileSync(__basedir + '/up/' + image.name, image.data);		
                
                // exit node.js app
                res.json({'msg': 'File uploaded successfully!', 'file': req.file});

              }
              catch(e){
                console.log(e);
                res.json({'err': e});
              }
            })*/

            //res.sendStatus(200);            
        }
    });  

  });

//*******************************************************************************

//*******************************************************************************
router.post('/memberdetailsForm', (req,res) =>{

  upload(req, res, (err) => {
    
      if(err)
      {

      }
      else 
      {
          console.log(JSON.stringify(req.body));

          model.create({
            worknumber       : req.body.worknumber,
            name             : req.body.name,
            surname          : req.body.surname,
            qualification    : req.body.qualification,
            department       : req.body.department,
            skills           : req.body.skills,
            position         : req.body.position,
            nationality      : req.body.nationality,
            gender           : req.body.gender,
            house            : req.body.house,
            address          : req.body.address,
            comments         : req.body.comments,
            documents  : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename)
          }).then((file) =>{

            fs.unlink(__basedir + '/Uploads/' + req.file.filename, (err) => {
              if (err) throw err;
              console.log(`${__basedir + '/Uploads/' + req.file.filename} was Removed !`);
            });
            
            res.sendStatus(200); 
          })           
      }
  });  

});

//*******************************************************************************

  return router;

}

module.exports = createRouter;