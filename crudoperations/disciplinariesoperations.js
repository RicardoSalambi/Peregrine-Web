const db = require('../sequelize/dbconnection.js');
const mysql = require('mysql2');
const dbconfig = require('../dbconfig');

const upload = require('../multer/upload')
const fs = require('fs');




getdisciplinarieslogs = (req, res, next, connection) => {

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


getdisciplinarieslogsdetails = (req, res, next, connection) => {

    let queryString = `select * from ${'disciplinarieslogs'} where date = '${req.params.date}' and worknumber = ${req.params.id};`;

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


adddisciplinary = (req, res, db) => {

    upload(req, res ,(err) => {
      
        if(err)
        {
            console.log(err);
        }
        else 
        {

            db.disciplinariesmodel.create({

                date              : req.body.date,//Date.now(),
                worknumber        : req.body.worknumber,
                MDD               : req.body.MDD,
                filename          : req.file.originalname,
                file              : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename),
                comments          : req.body.comments
            }).then(() =>{

                db.disciplinarieslogsmodel.create({
                
                    date              : req.body.date,//Date.now(),
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

}




module.exports = {

    getdisciplinarieslogs,
    getdisciplinarieslogsdetails,

    adddisciplinary,

}