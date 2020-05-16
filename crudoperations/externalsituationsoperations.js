const db = require('../sequelize/dbconnection.js');
const mysql = require('mysql2');
const dbconfig = require('../dbconfig');

const upload = require('../multer/upload')


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





module.exports = {

    getexternalsituationslogs,
    getexternalsituationslogsdetails,

    addexternalsituations,

}