const express = require('express');

const moment = require('moment-timezone');

const upload = require('./multer/upload')

const fs = require('fs');

var stream = require('stream');

const mysql = require('mysql2');

/////////////////////////////////////////////
  const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'NetlettiWorld@1',
    database : 'crudtest',
    timezone : 'Z'
    //port: '3306'
  });
/////////////////////////////////////////////

function createRouter(db) 
{
  const router = express.Router();
  const owner = '';

//*******************************************************************************
  router.get('/allmembers' , (req, res, next) => {
    db.peregrineworkersmodel.findAll({attributes: ['name', 'worknumber','surname', 'qualification','department', 'skills','position', 'nationality','gender', 'house','address', 'comments']})
      .then(peregrineworkers => {

        res.json(peregrineworkers)

      })
      .catch(err => console.log(err)
      );

  });
//*******************************************************************************

//*******************************************************************************
router.get('/getperegrineworkerslogs/:id/:table' , (req, res, next) => {

  let queryString = `select a.date as date, a.worknumber as worknumber, b.name as name, b.surname as surname, b.qualification as qualification, b.department as department from ${req.params.table} a ,peregrineworkers b where a.worknumber = ${req.params.id} and b.worknumber = ${req.params.id};`;

  connection.query(queryString, (err,rows,fields) => {
    if (err) 
    {
        console.log('Query Failed with : ' + err)
        res.end();
    }
    else
    {
        res.json(rows) //If data does not show use this command in mysql terminal 'ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourPassword';'
    }
    
  });

  /*db.peregrineworkerslogsmodel.findAll(
    {
      where: {
        worknumber: req.params.id
      }
    }  )
    .then(peregrineworkers => {
        
      res.json(peregrineworkers)

    })
    .catch(err => console.log(err)
    );*/

});
//*******************************************************************************

//*******************************************************************************
router.get('/getperegrineworkerslogsdetails/:date/:id' , (req, res, next) => {
  db.peregrineworkerslogsmodel.findAll(
    {
      where: {
        date  : req.params.date,
        worknumber: req.params.id
      }
    }  )
    .then(peregrineworkers => {
        
      res.json(peregrineworkers)

    })
    .catch(err => console.log(err)
    );

});
//*******************************************************************************






//*******************************************************************************
router.get('/getlogs' , (req, res, next) => {
  db.peregrineworkersmodel.findAll({attributes: ['worknumber', 'name','surname', 'qualification']})
    .then(peregrineworkers => {
        
      res.json(peregrineworkers)

    })
    .catch(err => console.log(err)
    );

});
//*******************************************************************************

//*******************************************************************************
router.get('/getdependancieslogs/:id/:table' , (req, res, next) => {  
  
  let queryString = `select a.date as date, a.worknumber as worknumber, b.name as name, b.surname as surname, b.qualification as qualification, b.department as department from ${req.params.table} a ,peregrineworkers b where a.worknumber = ${req.params.id} and b.worknumber = ${req.params.id};`;

  console.log(queryString);  

  connection.query(queryString, (err,rows,fields) => {
    if (err) 
    {
        console.log('Query Failed with : ' + err)
        res.end();
    }
    else
    {
        res.json(rows) //If data does not show use this command in mysql terminal 'ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourPassword';'
    }
    
  });

  /*db.dependancieslogmodel.findAll({

    where: {name: 'Ricardo'}, attributes: ['date','worknumber'], 
    include: [
      {
        model:db.peregrineworkersmodel, where: {name: 'Ricardo'}, attributes:['name','surname','qualification','department']
      }
    ]

  })
  .then(courses => {        
        res.json(courses);
  })
  .catch(err => console.log(err)
  );*/
  

});
//*******************************************************************************





//*******************************************************************************
router.get('/getdependancieslogsdetails/:date/:id' , (req, res, next) => {
  db.dependancieslogmodel.findAll(
    {
      where: {
        date  : req.params.date,
        worknumber: req.params.id
      }
    }  
  )
    .then(data => {
        
      res.json(data)

    })
    .catch(err => console.log(err)
    );

});
//*******************************************************************************







/*mysql.types.setTypeParser(1114, function(stringValue) {
  return new Date(stringValue.substring(0, 10) + 'T' + stringValue.substring(11) + '.000Z')

*/













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

            date             : req.body.date,//moment().tz("Africa/Johannesburg").format(),//Date.now(),
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
            imgfile          : 'NULL'
          }).then((file) =>{


            db.peregrineworkerslogsmodel.create({
              
              date             : req.body.date,//moment().tz("Africa/Johannesburg").format(),//Date.now(),
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
              imgfile          : 'NULL'
            }).then((file) =>{
              fs.unlink(__basedir + '/Uploads/' + req.file.filename, (err) => {
                if (err) throw err;
                console.log(`${__basedir + '/Uploads/' + req.file.filename} was Removed !`);
              });
            })
            
            
            

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

            date              : Date.now(),
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

          date              : Date.now(),
          worknumber        : req.body.worknumber,
          MDD               : req.body.MDD,
          filename          : req.file.originalname,
          file              : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename),
          comments          : req.body.comments
        }).then(() =>{

            db.disciplinarieslogsmodel.create({
            
              date              : Date.now(),
              worknumber        : req.body.worknumber,
              MDD               : req.body.MDD,
              filename          : req.file.originalname,
              file              : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename),
              comments          : req.body.comments

            }).then((file) =>{

              fs.unlink(__basedir + '/Uploads/' + req.file.filename, (err) => {
                if (err) throw err;
                console.log(`${__basedir + '/Uploads/' + req.file.filename} was Removed !`);
              });
              
               
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

          date             : Date.now(),
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

          date              : Date.now(),
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

          date                      : Date.now(),
          worknumber                : req.body.worknumber,
          trainingdescription       : req.body.trainingdescription,
          startdate                 : req.body.startdate,
          enddate                   : req.body.enddate,
          filename                  : req.file.originalname,
          file                      : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename)

        }).then(() => {

          db.traininglogsmodel.create({
          
            date                      : Date.now(),
            worknumber                : req.body.worknumber,
            trainingdescription       : req.body.trainingdescription,
            startdate                 : req.body.startdate,
            enddate                   : req.body.enddate,
            filename                  : req.file.originalname,
            file                      : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename)

          }).then((file) =>{

            fs.unlink(__basedir + '/Uploads/' + req.file.filename, (err) => {
              if (err) throw err;
              console.log(`${__basedir + '/Uploads/' + req.file.filename} was Removed !`);
            });
            
             
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