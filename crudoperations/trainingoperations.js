const db = require('../sequelize/dbconnection.js');
const mysql = require('mysql2');
const dbconfig = require('../dbconfig');

const upload = require('../multer/upload')
const fs = require('fs');



getlatesttraining = (req, res, next, connection) => {

  let queryString = `select * from ${'trainings'} where worknumber = ${req.params.id};`;

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

}

gettraininglogs = (req, res, next, connection) => {

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

}


gettraininglogsdetails = (req, res, next, connection) => {

    let queryString = `select * from ${'traininglogs'} where date = '${req.params.date}' and worknumber = ${req.params.id};`;

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

}



addtraining = (req, res, db) => {

    upload(req, res, /*next ,*/(err) => {
      
        if(err)
        {
          console.log(err);
        }
        else 
        {
            db.trainingmodel.create({
    
              date                      : req.body.date,//Date.now(),
              worknumber                : req.body.worknumber,
              trainingdescription       : req.body.trainingdescription,
              startdate                 : req.body.startdate,
              enddate                   : req.body.enddate,
              filename                  : req.file.originalname,
              file                      : fs.readFileSync(__basedir + '/Uploads/files/' + req.file.filename)
    
            }).then(() => {
    
              db.traininglogsmodel.create({
              
                date                      : req.body.date,//Date.now(),
                worknumber                : req.body.worknumber,
                trainingdescription       : req.body.trainingdescription,
                startdate                 : req.body.startdate,
                enddate                   : req.body.enddate,
                filename                  : req.file.originalname,
                file                      : fs.readFileSync(__basedir + '/Uploads/files/' + req.file.filename)
    
              }).then((file) =>{
    
                fs.unlink(__basedir + '/Uploads/files/' + req.file.filename, (err) => {
                  if (err) throw err;
                  console.log(`${__basedir + '/Uploads/files/' + req.file.filename} was Removed !`);
                });
                
                 
              });
              
            }); 
    
        }
    
      });

}




//****************Update Request****************

updatetraining = (req, res, next, db, connection) => {

  upload(req, res, (err) => {
  
      if(err)
      {
        console.log(err);        
      }
      else 
      {
  
        db.trainingmodel.findByPk(req.params.id )
          .then( member => {
            // Check if record exists in db
  
            if (member) {                
              member.update({ 

                  date                      : req.body.date,
                  worknumber                : req.body.worknumber,
                  trainingdescription       : req.body.trainingdescription,
                  startdate                 : req.body.startdate,
                  enddate                   : req.body.enddate,
                  filename                  : req.file.originalname,
                  file                      : fs.readFileSync(__basedir + '/Uploads/files/' + req.file.filename)
                
              })
              .then( () => {
                //res.json(member)
                db.traininglogsmodel.create({
                
                  date                      : req.body.date,
                  worknumber                : req.body.worknumber,
                  trainingdescription       : req.body.trainingdescription,
                  startdate                 : req.body.startdate,
                  enddate                   : req.body.enddate,
                  filename                  : req.file.originalname,
                  file                      : fs.readFileSync(__basedir + '/Uploads/files/' + req.file.filename)
                  
                })
                .then((file) => {
  
                    fs.unlink(__basedir + '/Uploads/files/' + req.file.filename, (err) => {
                      if (err) throw err;
                      console.log(`${__basedir + '/Uploads/files/' + req.file.filename} was Removed !`);
                    });
  
                });
  
              })

  
            }





  
          })
      }
    });

}








updatetraininglogs = (req, res, next, db, connection) => {

  let h = new Date(req.params.date)
  let getdate = h.setHours(h.getHours() - 2)

  upload(req, res, (err) => {
  
      if(err)
      {
        console.log(err);        
      }
      else 
      { 
  
        db.traininglogsmodel.findOne({where : {date : getdate ,worknumber : req.params.id} })
          .then( member => {
            // Check if record exists in db
  
            if (member) {
              
              member.destroy();

              db.traininglogsmodel.create({

                  date                      : getdate,
                  worknumber                : req.body.worknumber,
                  trainingdescription       : req.body.trainingdescription,
                  startdate                 : req.body.startdate,
                  enddate                   : req.body.enddate,
                  filename                  : req.file.originalname,
                  file                      : fs.readFileSync(__basedir + '/Uploads/files/' + req.file.filename)
  
              })
              .then((rows) => {
  
                fs.unlink(__basedir + '/Uploads/files/' + req.file.filename, (err) => {
                  if (err) throw err;
                  console.log(`${__basedir + '/Uploads/files/' + req.file.filename} was Removed !`);
                });
                
              })
  
            }  
  
          })
      }
    });
}




//******************Delete Request************* 
terminatetraininglogs = (req, res, next, db, connection) => {

  let h = new Date(req.params.date)
  let getdate = h.setHours(h.getHours() - 2)

  upload(req, res, (err) => {
    
    if(err)
    {
      console.log(err);        
    }
    else 
    {

      db.traininglogsmodel.findOne({where : {date : getdate ,worknumber : req.params.id} })
        .then( member => {
          // Check if record exists in db  
          
          if (member) {

            member.destroy();  
            
          }

        })

    }

  });

}





module.exports = {

    getlatesttraining,

    gettraininglogs,
    gettraininglogsdetails,

    addtraining,

    updatetraining,
    updatetraininglogs,

    terminatetraininglogs

}