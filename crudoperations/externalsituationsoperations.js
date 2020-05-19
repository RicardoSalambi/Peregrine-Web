const db = require('../sequelize/dbconnection.js');
const mysql = require('mysql2');
const dbconfig = require('../dbconfig');

const upload = require('../multer/upload')


getlatestexternalsituations = (req, res, next, connection) => {

    let queryString = `select * from ${'externalsituations'} where worknumber = ${req.params.id};`;

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

getexternalsituationslogs = (req, res, next, connection) => {

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


getexternalsituationslogsdetails = (req, res, next, connection) => {

    let queryString = `select * from ${'externalsituationslogs'} where date = '${req.params.date}' and worknumber = ${req.params.id};`;

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


addexternalsituations = (req, res, db) => {

    upload(req, res,/* next ,*/(err) => {
      
        if(err)
        {
          console.log(err);
        }
        else 
        {
    
            db.externalsituationsmodel.create({
    
              date             : req.body.date,//Date.now(),
              worknumber        : req.body.worknumber,
              responsiblities   : req.body.responsiblities
              
            }).then(() =>{
    
                db.externalsituationslogsmodel.create({
                
                  date              : req.body.date,//Date.now(),
                  worknumber        : req.body.worknumber,
                  responsiblities   : req.body.responsiblities
    
                })
              
            }); 
    
        }
    
      });

}




//****************Update Request****************

updateexternalsituations = (req, res, next, db, connection) => {

    upload(req, res, (err) => {
    
        if(err)
        {
          console.log(err);        
        }
        else 
        {
    
          db.externalsituationsmodel.findByPk(req.params.id )
            .then( member => {
    
              if (member) {
                
                member.update({ 

                    date              : req.body.date,//Date.now(),
                    worknumber        : req.body.worknumber,
                    responsiblities   : req.body.responsiblities
                  
                })
                .then( () => {
                  db.externalsituationslogsmodel.create({
                  
                    date              : req.body.date,//Date.now(),
                    worknumber        : req.body.worknumber,
                    responsiblities   : req.body.responsiblities
                    
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








updateexternalsituationslogs = (req, res, next, db, connection) => {

    let h = new Date(req.params.date)
    let getdate = h.setHours(h.getHours() - 2)

    upload(req, res, (err) => {
    
        if(err)
        {
          console.log(err);        
        }
        else 
        { 
    
                db.externalsituationslogsmodel.findOne({where : {date : getdate ,worknumber : req.params.id} })
                    .then( member => {
            
                        if (member) {
                            
                            member.destroy();

                            db.externalsituationslogsmodel.create({

                                date              : getdate,
                                worknumber        : req.body.worknumber,
                                responsiblities   : req.body.responsiblities
                
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








module.exports = {

    getlatestexternalsituations,

    getexternalsituationslogs,
    getexternalsituationslogsdetails,

    addexternalsituations,

    updateexternalsituations,
    updateexternalsituationslogs

}