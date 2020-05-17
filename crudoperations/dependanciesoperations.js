const db = require('../sequelize/dbconnection.js');
const mysql = require('mysql2');
const dbconfig = require('../dbconfig');

const upload = require('../multer/upload')
const fs = require('fs');




//*******GET Request***********

getlatestdependancies = (req, res, next, connection) => {

  let queryString = `select * from ${'dependancies'} where worknumber = ${req.params.id};`;

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

getdependancieslogs = (req, res, next, connection) => {
    
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

}



getdependancieslogsdetails = (req, res, next, connection) => {

    let queryString = `select * from ${'dependancieslogs'} where date = '${req.params.date}' and worknumber = ${req.params.id};`;

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
    /*db.dependancieslogmodel.findAll(
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
        );*/

}


adddependancies = (req, res, db) => {

    upload(req, res, /*next ,*/(err) => {
    
        if(err)
        {
          console.log(err);
        }
        else 
        {
          db.dependanciesmodel.create({
  
              date              : req.body.date,//Date.now(),
              worknumber        : req.body.worknumber,
              next_of_kin       : req.body.NOK,
              emergencycontact  : req.body.emergencycontact,
              filename          : req.file.originalname,
              file              : fs.readFileSync(__basedir + '/Uploads/' + req.file.filename)
  
            }).then(() =>{
  
              db.dependancieslogmodel.create({
              
                date              : req.body.date,//Date.now(),
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

}





//****************Update Request****************

updatedependancies = (req, res, next, db, connection) => {

    upload(req, res, (err) => {
    
        if(err)
        {
          console.log(err);        
        }
        else 
        {
    
          db.dependanciesmodel.findByPk(req.params.id )
            .then( member => {
              // Check if record exists in db
    
              if (member) {
                
    
                // member.date             = req.params.date;
                member.worknumber       = req.body.worknumber;
                member.next_of_kin      = req.body.next_of_kin;
                member.emergencycontact = req.body.emergencycontact;
                member.filename         = req.file.originalname;
                member.file             = fs.readFileSync(__basedir + '/Uploads/' + req.file.filename);
    
                member.save();
    
              }  
    
            })
        }
      });

}



updatedependancieslogs = (req, res, next, db, connection) => {

    upload(req, res, (err) => {
    
        if(err)
        {
          console.log(err);        
        }
        else 
        { 
    
          db.dependancieslogmodel.findOne({where : {date : req.params.date ,worknumber : req.params.id} })
            .then( member => {
              // Check if record exists in db
    
              
    
              if (member) {
    
                console.log(member);
                
                
                // member.date             = req.params.date;
                member.worknumber       = req.body.worknumber;
                member.next_of_kin      = req.body.next_of_kin;
                member.emergencycontact = req.body.emergencycontact;
                //member.filename         = req.file.originalname;
                //member.file             = fs.readFileSync(__basedir + '/Uploads/' + req.file.filename);
    
                member.save();
    
                // member.update(
                //   { worknumber: req.body.worknumber,
                //   next_of_kin: req.body.next_of_kin,
                //   emergencycontact:req.body.emergencycontact}
                // )
                // .then((rows) => {
                //   //res.json(member)
                //   console.log(rows);
                //   //member.save()
                  
                // })
    
              }  
    
            })
        }
      });
}






module.exports = {
  
    getlatestdependancies,

    getdependancieslogs,
    getdependancieslogsdetails,

    adddependancies,

    updatedependancies,
    updatedependancieslogs,

}