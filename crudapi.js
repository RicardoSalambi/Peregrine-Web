const express = require('express');

//const datamodel = require('./sequelize/dbconnection')

const upload = require('./multer/upload')

const fs = require('fs');

var stream = require('stream');


function createRouter(db) 
{
  const router = express.Router();
  const owner = '';

//*******************************************************************************
  router.get('/allmembers' , (req, res, next) => {
    db.peregrineworkersmodel.findAll({attributes: ['name', 'worknumber','surname', 'qualification','department', 'skills','position', 'nationality','gender', 'house','address', 'comments']})
      .then(peregrineworkers => {

        //console.log(peregrineworkers);   
        res.json(peregrineworkers)

      })
      .catch(err => console.log(err)
      );

  });
//*******************************************************************************



//*******************************************************************************
router.post('/addmemberdetails', (req,res, next) =>{

  //console.log('here');
  

  upload(req, res, (err) => {
    
      if(err)
      {
        console.log(err);        
      }
      else 
      {
          //console.log(JSON.stringify(req.body));

          db.peregrineworkersmodel.create({
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
            filename         : req.file.originalname,
            file             : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename)
          }).then((file) =>{


            db.peregrineworkerslogsmodel.create({

              date             : Date.now(),
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
              filename         : req.file.originalname,
              file             : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename),
              //imgfile          : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename),
            }).then((file) =>{
              fs.unlink(__basedir + '/Uploads/' + req.file.filename, (err) => {
                if (err) throw err;
                console.log(`${__basedir + '/Uploads/' + req.file.filename} was Removed !`);
              });
            })
            
            res.sendStatus(200);
            

          })  
          
          next(); 
      }
  });  

});

//*******************************************************************************



//*******************************************************************************
router.post('/adddependancies', (req,res) =>{

  /*var data = req.body;
  console.log('request received:', data);*/

  upload(req, res, /*next ,*/(err) => {
    
      if(err)
      {
        console.log(err);
      }
      else 
      {
        db.dependanciesmodel.create({

            worknumber        : req.body.worknumber,
            next_of_kin       : req.body.NOK,
            emergencycontact  : req.body.emergencycontact,
            filename          : req.file.originalname,
            file              : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename)

          }).then(() =>{

            db.dependancieslogmodel.create({
            
              date              : Date.now(),
              worknumber        : req.body.worknumber,
              next_of_kin       : req.body.NOK,
              emergencycontact  : req.body.emergencycontact,
              filename          : req.file.originalname,
              file              : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename)

            }).then((file) =>{

              fs.unlink(__basedir + '/Uploads/' + req.file.filename, (err) => {
                if (err) throw err;
                console.log(`${__basedir + '/Uploads/' + req.file.filename} was Removed !`);
              });
              
              res.sendStatus(200); 
            });
            
          }); 
          
          //next(); 
      }
  });  

});

//*******************************************************************************




//*******************************************************************************
router.post('/adddisciplinary', (req,res) => {
  upload(req, res ,(err) => {
      
    if(err)
    {
      console.log(err);
    }
    else 
    {

        db.disciplinariesmodel.create({

          worknumber        : req.body.worknumber,
          MDD               : req.body.MDD,
          file              : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename),
          comments          : req.body.comments
        }).then(() =>{

            db.disciplinarieslogsmodel.create({
            
              date              : Date.now(),
              worknumber        : req.body.worknumber,
              MDD               : req.body.MDD,
              file              : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename),
              comments          : req.body.comments

            }).then((file) =>{

              fs.unlink(__basedir + '/Uploads/' + req.file.filename, (err) => {
                if (err) throw err;
                console.log(`${__basedir + '/Uploads/' + req.file.filename} was Removed !`);
              });
              
              res.sendStatus(200); 
            });
          
        }); 
        
        //next(); 


    }

  });

});
//*******************************************************************************




//*******************************************************************************
router.post('/addexternalsituations', (req,res) =>{

  upload(req, res,/* next ,*/(err) => {
      
    if(err)
    {
      console.log(err);
    }
    else 
    {

        db.externalsituationsmodel.create({

          worknumber        : req.body.worknumber,
          responsiblities   : req.body.responsiblities
          
        }).then(() =>{

            db.externalsituationslogsmodel.create({
            
              date              : Date.now(),
              worknumber        : req.body.worknumber,
              responsiblities   : req.body.responsiblities

            })
          
        }); 

    }

  });

});
//*******************************************************************************




//*******************************************************************************
router.post('/addperformance', (req,res) =>{

  upload(req, res, /*next ,*/(err) => {
      
    if(err)
    {
      console.log(err);
    }
    else 
    {

        db.performancemodel.create({

          worknumber        : req.body.worknumber,
          workethic         : req.body.workethic,
          puntuality        : req.body.puntuality,
          teamwork          : req.body.teamwork,
          initiative        : req.body.initiative,
          positivity        : req.body.positivity,
          comments          : req.body.comments,
          
        }).then(() => {

            db.performancelogsmodel.create({
            
              date              : Date.now(),
              worknumber        : req.body.worknumber,
              workethic         : req.body.workethic,
              puntuality        : req.body.puntuality,
              teamwork          : req.body.teamwork,
              initiative        : req.body.initiative,
              positivity        : req.body.positivity,
              comments          : req.body.comments,
            })
          
        }); 

    }

  });

});
//*******************************************************************************





//*******************************************************************************
router.post('/addtraining', (req,res) =>{

  upload(req, res, /*next ,*/(err) => {
      
    if(err)
    {
      console.log(err);
    }
    else 
    {
        db.trainingmodel.create({

          worknumber                : req.body.worknumber,
          trainingdescription       : req.body.trainingdescription,
          startdate                 : req.body.startdate,
          enddate                   : req.body.enddate,
          file                      : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename)

        }).then(() => {

          db.traininglogsmodel.create({
          
            date                      : Date.now(),
            worknumber                : req.body.worknumber,
            trainingdescription       : req.body.trainingdescription,
            startdate                 : req.body.startdate,
            enddate                   : req.body.enddate,
            file                      : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename)

          }).then((file) =>{

            fs.unlink(__basedir + '/Uploads/' + req.file.filename, (err) => {
              if (err) throw err;
              console.log(`${__basedir + '/Uploads/' + req.file.filename} was Removed !`);
            });
            
            res.sendStatus(200); 
          });
          
        }); 

    }

  });

});
//*******************************************************************************





//*******************************************************************************
router.post('/addworkleave', (req,res) =>{

  upload(req, res, /*next ,*/(err) => {
      
    if(err)
    {
      console.log(err);
    }
    else 
    {

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