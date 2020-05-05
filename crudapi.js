const express = require('express');
const peregrineworkersmodel = require('./sequelize/models/peregrineworkers')
const peregrinedependanciesmodel = require('./sequelize/models/peregrinedependancies')
const upload = require('./multer/upload')

const fs = require('fs');

var stream = require('stream');


function createRouter(db) 
{
  const router = express.Router();
  const owner = '';

//*******************************************************************************
  router.get('/allmembers' , (req, res, next) => {
    //res.sendStatus(200); 
    /*db.query(
      `SELECT * FROM peregrineworkers;`, //where count = ${req.params.id2}
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          //res.status(200).json(results);
        }
      }
    );*/

    peregrineworkersmodel.findAll({attributes: ['name', 'worknumber','surname', 'qualification','department', 'skills','position', 'nationality','gender', 'house','address', 'comments']})
      .then(peregrineworkers => {
        console.log(peregrineworkers);
        //res.sendStatus(200);        
        res.json(peregrineworkers)
      })
      .catch(err => console.log(err)
      );

  });
//*******************************************************************************










//*******************************************************************************
  router.post('/add', (req,res) =>{

    var data = req.body;
    console.log('request received:', data);

    upload(req, res, (err) => {
      
        if(err)
        {
          console.log(err);
        }
        else 
        {                 
            

            peregrinedependanciesmodel.create({

              worknumber        : req.body.worknumber,
              next_of_kin       : req.body.NOK,
              emergencycontact  : req.body.emergencycontact,
              file              : req.file//fs.readFileSync(__basedir + '/Uploads/' + req.file.filename)

            });   
        }
    });  

  });

//*******************************************************************************












//*******************************************************************************
router.post('/memberdetailsForm', (req,res) =>{

  console.log('here');
  

  upload(req, res, (err) => {
    
      if(err)
      {
        console.log(err);        
      }
      else 
      {
          console.log(JSON.stringify(req.body));

          peregrineworkersmodel.create({
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
            documents        : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename)
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






//*********************************Download File*********************************

router.get('/getfile', (req, res) => {

  model.findByPk('1312')
  .then(file => {

    
		var fileContents = Buffer.from(file.documents, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);/**/
		
		/*res.set('Content-disposition', 'attachment; filename=' + file.name);
    res.set('Content-Type', file.type);*/
    
    readStream.pipe(/*fs.createWriteStream()*/res)

		//readStream.pipe(res);
  })
  
});

//*******************************************************************************

  return router;

}

module.exports = createRouter;