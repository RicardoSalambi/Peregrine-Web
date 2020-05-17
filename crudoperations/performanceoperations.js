const db = require('../sequelize/dbconnection.js');
const mysql = require('mysql2');
const dbconfig = require('../dbconfig');

const upload = require('../multer/upload')



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



module.exports = {

    getlatestperformance,

    getperformancelogs,
    getperformancelogsdetails,

    addperformance,

}