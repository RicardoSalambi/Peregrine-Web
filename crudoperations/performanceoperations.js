const db = require('../sequelize/dbconnection.js');
const mysql = require('mysql2');
const dbconfig = require('../dbconfig');

const upload = require('../multer/upload')


//****************GET Request****************
getlatestperformance = (req, res, next, connection) => {

    let queryString = `select * from ${'performances'} where worknumber = ${req.params.id};`;

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

getperformancelogs = (req, res, next, connection) => {

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

getperformancelogsdetailsID = (req, res, next, connection) => {

  let queryString = `select * from ${'performancelogs'} where worknumber = ${req.params.id};`;

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


getperformancelogsdetails = (req, res, next, connection) => {

    let queryString = `select * from ${'performancelogs'} where date = '${req.params.date}' and worknumber = ${req.params.id};`;

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


getperformancelogsdetailsIDpresentandpast = (req, res, next, connection) => {

  let queryString = `select * from ${'performancelogs'} where worknumber = ${req.params.id} and year(date) = ${req.params.year} UNION SELECT * FROM ${'performances'} order by ${'date'} desc`;

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





//****************POST Request****************
addperformance = (req, res, db) => {

    upload(req, res, /*next ,*/(err) => {
      
        if(err)
        {
          console.log(err);
        }
        else 
        {
    
            db.performancemodel.create({
    
              date              : req.body.date,//Date.now(),
              worknumber        : req.body.worknumber,
              workethic         : req.body.workethic,
              puntuality        : req.body.puntuality,
              teamwork          : req.body.teamwork,
              initiative        : req.body.initiative,
              positivity        : req.body.positivity,
              comments          : req.body.comments,
              
            }).then(() => {
    
                db.performancelogsmodel.create({
                
                  date              : req.body.date,//Date.now(),
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

}





//****************Update Request****************

updateperformance = (req, res, next, db, connection) => {

    upload(req, res, (err) => {
    
        if(err)
        {
          console.log(err);        
        }
        else 
        {
    
          db.performancemodel.findByPk(req.params.id )
            .then( member => {
              // Check if record exists in db
    
              if (member) {                
                member.update({ 

                    date              : req.body.date,
                    worknumber        : req.body.worknumber,
                    workethic         : req.body.workethic,
                    puntuality        : req.body.puntuality,
                    teamwork          : req.body.teamwork,
                    initiative        : req.body.initiative,
                    positivity        : req.body.positivity,
                    comments          : req.body.comments,
                  
                })
                .then( () => {
                  //res.json(member)
                  db.performancelogsmodel.create({
                  
                    date              : req.body.date,
                    worknumber        : req.body.worknumber,
                    workethic         : req.body.workethic,
                    puntuality        : req.body.puntuality,
                    teamwork          : req.body.teamwork,
                    initiative        : req.body.initiative,
                    positivity        : req.body.positivity,
                    comments          : req.body.comments,
                    
                  })
                  .then((file) => {
    
                    //   fs.unlink(__basedir + '/Uploads/files/' + req.file.filename, (err) => {
                    //     if (err) throw err;
                    //     console.log(`${__basedir + '/Uploads/files/' + req.file.filename} was Removed !`);
                    //   });
    
                  });
    
                })

    
              }


              




    
            })
        }
      });

}








updateperformancelogs = (req, res, next, db, connection) => {

    let h = new Date(req.params.date)
    let getdate = h.setHours(h.getHours() - 2)

    upload(req, res, (err) => {
    
        if(err)
        {
          console.log(err);        
        }
        else 
        { 
    
          db.performancelogsmodel.findOne({where : {date : getdate ,worknumber : req.params.id} })
            .then( member => {
              // Check if record exists in db
    
              if (member) {
                
                member.destroy();

                db.performancelogsmodel.create({

                    date              : getdate,
                    worknumber        : req.body.worknumber,
                    workethic         : req.body.workethic,
                    puntuality        : req.body.puntuality,
                    teamwork          : req.body.teamwork,
                    initiative        : req.body.initiative,
                    positivity        : req.body.positivity,
                    comments          : req.body.comments,
    
                })
                .then((rows) => {
    
                //   fs.unlink(__basedir + '/Uploads/files/' + req.file.filename, (err) => {
                //     if (err) throw err;
                //     console.log(`${__basedir + '/Uploads/files/' + req.file.filename} was Removed !`);
                //   });
                  
                })
    
              }  
    
            })
        }
      });
}




//******************Delete Request************* 
terminateperformancelogs = (req, res, next, db, connection) => {

  let h = new Date(req.params.date)
  let getdate = h.setHours(h.getHours() - 2)

  upload(req, res, (err) => {
    
    if(err)
    {
      console.log(err);        
    }
    else 
    {

      db.performancelogsmodel.findOne({where : {date : getdate ,worknumber : req.params.id} })
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

    getlatestperformance,

    getperformancelogs,
    getperformancelogsdetails,
    getperformancelogsdetailsID,
    getperformancelogsdetailsIDpresentandpast,

    addperformance,

    updateperformance,
    updateperformancelogs,

    terminateperformancelogs

}