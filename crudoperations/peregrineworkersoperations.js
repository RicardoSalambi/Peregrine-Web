const db = require('../sequelize/dbconnection.js');
const mysql = require('mysql2');
const dbconfig = require('../dbconfig');

const upload = require('../multer/upload')
const fs = require('fs');

/////////////////////////////////////////////
const connection = mysql.createConnection({
    host : dbconfig.host,
    user : dbconfig.user,
    password : dbconfig.password,
    database : dbconfig.database,
    timezone : 'Z'
    //port: '3306'
  });
/////////////////////////////////////////////


//*******GET Request***********

allmembers = (req, res, next) =>  {    

    db.peregrineworkersmodel.findAll({attributes: ['name', 'worknumber','surname', 'qualification','department', 'skills','position', 'nationality','gender', 'house','address', 'comments']})
      .then(peregrineworkers => {

        res.json(peregrineworkers)

      })
      .catch(err => console.log(err)
      );

}


getlatestperegrineworkers = (req, res, next) => {

  let queryString = `select * from ${'peregrineworkers'} where worknumber = ${req.params.id};`;

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



getperegrineworkerslogs = (req, res, next) => {    

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


}


getperegrineworkerslogsdetails = (req, res, next) => {

    let queryString = `select * from ${'peregrineworkerslogs'} where date = '${req.params.date}' and worknumber = ${req.params.id};`;

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
    /*db.peregrineworkerslogsmodel.findAll(
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
        );*/
}









//****************Post Request****************

addmemberdetails = (req, res, next, db) => {

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
            file             : fs.readFileSync(__basedir + '/Uploads/files/' + req.file.filename),
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
              file             : fs.readFileSync(__basedir + '/Uploads/files/' + req.file.filename),
              imgfile          : 'NULL'
            }).then((file) =>{

              fs.unlink(__basedir + '/Uploads/files/' + req.file.filename, (err) => {
                if (err) throw err;
                console.log(`${__basedir + '/Uploads/files/' + req.file.filename} was Removed !`);
              });

            })
            
            
            

          })  
          
          next(); 
      }
  });  


}





//****************Update Request****************

updateperegrineworkers = (req, res, next, db, connection) => {

  upload(req, res, (err) => {
    
    if(err)
    {
      console.log(err);        
    }
    else 
    {
      console.log('Peregrine main table');
      
      db.peregrineworkersmodel.findByPk(req.params.id )
        .then( member => {
          // Check if record exists in db

          if (member) {

            //console.log(member);
            

            // member.name = 'one';
            // member.surname = '1';           

            // member.date             = req.body.date;            
            // member.worknumber       = req.body.worknumber;
            // member.name             = req.body.name;
            // member.surname          = req.body.surname;
            // member.qualification    = req.body.qualification;
            // member.department       = req.body.department;
            // member.skills           = req.body.skills;
            // member.position         = req.body.position;
            // member.nationality      = req.body.nationality;
            // member.gender           = req.body.gender;
            // member.house            = req.body.house;
            // member.address          = req.body.address;
            // member.comments         = req.body.comments;
            // member.filename         = req.file.originalname;
            // member.file             = fs.readFileSync(__basedir + '/Uploads/files/' + req.file.filename);
            // member.imgfile          = 'NULL';

            // member.save();

            member.update({ 
              date              : req.body.date,
              worknumber        : req.body.worknumber,
              name              : req.body.name,
              surname           : req.body.surname,
              qualification     : req.body.qualification,
              department        : req.body.department,
              skills            : req.body.skills,
              position          : req.body.position,
              nationality       : req.body.nationality,
              gender            : req.body.gender,
              house             : req.body.house,
              address           : req.body.address,
              comments          : req.body.comments,
              filename          : req.file.originalname,
              file              : fs.readFileSync(__basedir + '/Uploads/files/' + req.file.filename),
              imgfile           : 'NULL'
            })
            .then(() => {
              //res.json(member)
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
                file             : fs.readFileSync(__basedir + '/Uploads/files/' + req.file.filename),
                imgfile          : 'NULL'
                
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


updateperegrineworkerslogs = (req, res, next, db, connection) => {

  let h = new Date(req.params.date)
  let getdate = h.setHours(h.getHours() - 2)

  upload(req, res, (err) => {
    
    if(err)
    {
      console.log(err);        
    }
    else 
    {

      db.peregrineworkerslogsmodel.findOne({where : {date : getdate ,worknumber : req.params.id} })
        .then( member => {
          // Check if record exists in db
          
          //member.delete();      
          
          if (member) {

            member.destroy();
    
            db.peregrineworkerslogsmodel.create({

              date             : getdate,//moment().tz("Africa/Johannesburg").format(),//Date.now(),
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
              file             : fs.readFileSync(__basedir + '/Uploads/files/' + req.file.filename),
              imgfile          : 'NULL'

            })
            .then((rows) => {
              //res.json(member)
              // console.log(rows);
              // member.save()

              fs.unlink(__basedir + '/Uploads/files/' + req.file.filename, (err) => {
                if (err) throw err;
                console.log(`${__basedir + '/Uploads/files/' + req.file.filename} was Removed !`);
              });
              
            })

      /*
              //member.date             = req.body.date;            
              member.worknumber       = req.body.worknumber;
              member.name             = req.body.name;
              member.surname          = req.body.surname;
              member.qualification    = req.body.qualification;
              member.department       = req.body.department;
              member.skills           = req.body.skills;
              member.position         = req.body.position;
              member.nationality      = req.body.nationality;
              member.gender           = req.body.gender;
              member.house            = req.body.house;
              member.address          = req.body.address;
              member.comments         = req.body.comments;
              member.filename         = req.file.originalname;
              member.file             = fs.readFileSync(__basedir + '/Uploads/files/' + req.file.filename);
              member.imgfile          = 'NULL';

              member.save({ fields: ['date','worknumber','name','surname','qualification','department','skills','position','nationality','gender','house','address','comments','filename','file','imgfile'] });
      */

          }

        })

    }

  });

}




module.exports = {
    allmembers,
    getlatestperegrineworkers,
    getperegrineworkerslogs,
    getperegrineworkerslogsdetails,

    addmemberdetails,

    updateperegrineworkers,
    updateperegrineworkerslogs
}