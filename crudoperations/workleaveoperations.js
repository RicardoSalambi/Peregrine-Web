

//****************GET Request****************

getlatestworkleave = (req, res, next, connection) => {

    let queryString = `select * from ${'workleaves'} where worknumber = ${req.params.id};`;
  
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

  getworkleavelogs = (req, res, next, connection) => {

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

  getworkleavelogsdetails = (req, res, next, connection) => {

    let queryString = `select * from ${'workleavelogs'} where date = '${req.params.date}' and worknumber = ${req.params.id};`;

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


//****************Post Request****************
addworkleave = (req, res, db) => {

    let filepath = `${__basedir}/Uploads/files/`;

    upload(req, res, /*next ,*/(err) => {
      
        if(err)
        {
          console.log(err);
        }
        else 
        {
            db.workmodel.create({
    
              date                      : req.body.date,//Date.now(),
              worknumber                : req.body.worknumber,
              description               : req.body.description,
              startdate                 : req.body.startdate,
              enddate                   : req.body.enddate,
              filename                  : req.body.filename,
              file                      : fs.readFileSync(filepath + req.files.file[0].filename),
    
            }).then(() => {
    
              db.worklogsmodel.create({
              
                date                      : req.body.date,//Date.now(),
                worknumber                : req.body.worknumber,
                description               : req.body.description,
                startdate                 : req.body.startdate,
                enddate                   : req.body.enddate,
                filename                  : req.body.filename,
                file                      : fs.readFileSync(filepath + req.files.file[0].filename),
    
              }).then((file) =>{
    
                fs.unlink(filepath + req.files.file[0].filename, (err) => {
                  if (err) throw err;
                  console.log(`${filepath + req.files.file[0].filename} was Removed !`);
                });
                
                 
              });
              
            }); 
    
        }
    
      });

}



//****************Update Request****************

updateworkleave = (req, res, next, db, connection) => {

    let filepath = `${__basedir}/Uploads/files/`;
  
    upload(req, res, (err) => {
    
        if(err)
        {
          console.log(err);        
        }
        else 
        {
    
          db.workmodel.findByPk(req.params.id )
            .then( member => {
              // Check if record exists in db
    
              if (member) {                
                member.update({ 
  
                    date                      : req.body.date,//Date.now(),
                    worknumber                : req.body.worknumber,
                    description               : req.body.description,
                    startdate                 : req.body.startdate,
                    enddate                   : req.body.enddate,
                    filename                  : req.body.filename,
                    file                      : fs.readFileSync(filepath + req.files.file[0].filename),
                  
                })
                .then( () => {
                  //res.json(member)
                  db.worklogsmodel.create({
                  
                    date                      : req.body.date,//Date.now(),
                    worknumber                : req.body.worknumber,
                    description               : req.body.description,
                    startdate                 : req.body.startdate,
                    enddate                   : req.body.enddate,
                    filename                  : req.body.filename,
                    file                      : fs.readFileSync(filepath + req.files.file[0].filename),
                    
                  })
                  .then((file) => {
    
                    fs.unlink(filepath + req.files.file[0].filename, (err) => {
                      if (err) throw err;
                      console.log(`${filepath + req.files.file[0].filename} was Removed !`);
                    });
    
                  });
    
                })
  
    
              }
  
  
  
  
  
    
            })
        }
      });
  
  }
  
  
  
  
  
  
  
  
  updateworkleavelogs = (req, res, next, db, connection) => {
  
    let filepath = `${__basedir}/Uploads/files/`;
  
    let h = new Date(req.params.date)
    let getdate = h.setHours(h.getHours() - 2)
  
    upload(req, res, (err) => {
    
        if(err)
        {
          console.log(err);        
        }
        else 
        { 
    
          db.worklogsmodel.findOne({where : {date : getdate ,worknumber : req.params.id} })
            .then( member => {
              // Check if record exists in db
    
              if (member) {
                
                member.destroy();
  
                db.worklogsmodel.create({
  
                    date                      : req.body.date,//Date.now(),
                    worknumber                : req.body.worknumber,
                    description               : req.body.description,
                    startdate                 : req.body.startdate,
                    enddate                   : req.body.enddate,
                    filename                  : req.body.filename,
                    file                      : fs.readFileSync(filepath + req.files.file[0].filename),
    
                })
                .then((rows) => {
    
                  fs.unlink(filepath + req.files.file[0].filename, (err) => {
                    if (err) throw err;
                    console.log(`${filepath + req.files.file[0].filename} was Removed !`);
                  });
                  
                })
    
              }  
    
            })
        }
      });
  }
  
  
  
  
  //******************Delete Request************* 
  terminateworkleavelogs = (req, res, next, db, connection) => {
  
    let h = new Date(req.params.date)
    let getdate = h.setHours(h.getHours() - 2)
  
    upload(req, res, (err) => {
      
      if(err)
      {
        console.log(err);        
      }
      else 
      {
  
        db.worklogsmodel.findOne({where : {date : getdate ,worknumber : req.params.id} })
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

    getlatestworkleave,
    getworkleavelogs,
    getworkleavelogsdetails,

    addworkleave,

    updateworkleave,
    updateworkleavelogs,

    terminateworkleavelogs

}