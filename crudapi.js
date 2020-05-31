const express = require('express');

const moment = require('moment-timezone');



var stream = require('stream');




const peregrineworkers = require('./crudoperations/peregrineworkersoperations');
const dependancies = require('./crudoperations/dependanciesoperations');
const disciplinaries = require('./crudoperations/disciplinariesoperations');
const externalsituations = require('./crudoperations/externalsituationsoperations');
const performance = require('./crudoperations/performanceoperations');
const training = require('./crudoperations/trainingoperations');



function createRouter(db,connection) 
{
  const router = express.Router();
  const owner = '';



//*******************************************************************************
  router.get('/allmembers' , (req, res, next) => { peregrineworkers.allmembers(req, res, next) } );

  router.get('/getlatestperegrineworkers/:id' , (req, res, next) => { peregrineworkers.getlatestperegrineworkers(req, res, next) } );

  router.get('/getperegrineworkerslogs/:id/:table' , (req, res, next) => { peregrineworkers.getperegrineworkerslogs(req, res, next) } );

  router.get('/getperegrineworkerslogsdetails/:date/:id' , (req, res, next) => { peregrineworkers.getperegrineworkerslogsdetails(req, res, next) } );

  router.get('/memberdistribution' , (req, res, next) => { peregrineworkers.memberdistribution(req, res, next) } );


  router.post('/addmemberdetails', (req,res, next) => { peregrineworkers.addmemberdetails(req,res, next, db) } );


  router.put(`/updateperegrineworkers/:id`, (req, res, next) => { peregrineworkers.updateperegrineworkers(req, res, next, db, connection)  } );

  router.put(`/updateperegrineworkerslogs/:date/:id`, (req, res, next) => { peregrineworkers.updateperegrineworkerslogs(req, res, next, db, connection) } );

  
  router.delete(`/terminateperegrineworkerslogsID/:id`, (req, res, next) => { peregrineworkers.terminateperegrineworkerslogsID(req, res, next, db, connection) } );

  router.delete(`/terminateperegrineworkerslogs/:date/:id`, (req, res, next) => { peregrineworkers.terminateperegrineworkerslogs(req, res, next, db, connection) } );

//*******************************************************************************






//*******************************************************************************
  router.get('/getlatestdependancies/:id' , (req, res, next) => {  dependancies.getlatestdependancies(req, res, next, connection) } );

  router.get('/getdependancieslogs/:id/:table' , (req, res, next) => {  dependancies.getdependancieslogs(req, res, next, connection) } );

  router.get('/getdependancieslogsdetails/:date/:id' , (req, res, next) => { dependancies.getdependancieslogsdetails(req, res, next, connection) } );


  router.post('/adddependancies', (req,res) =>{ dependancies.adddependancies(req,res,db) } );


  router.put(`/updatedependancies/:id`, (req, res, next) => { dependancies.updatedependancies(req, res, next, db, connection) } );

  router.put(`/updatedependancieslogs/:date/:id`, (req, res, next) => { dependancies.updatedependancieslogs(req, res, next, db, connection) } );


  router.delete(`/terminatedependancieslogs/:date/:id`, (req, res, next) => { dependancies.terminatedependancieslogs(req, res, next, db, connection) } );

//*******************************************************************************





//*******************************************************************************
  router.get('/getlatestdisciplinaries/:id' , (req, res, next) => { disciplinaries.getlatestdisciplinaries(req, res, next, connection) } );

  router.get('/getdisciplinarieslogs/:id/:table' , (req, res, next) => { disciplinaries.getdisciplinarieslogs(req, res, next, connection) } );

  router.get('/getdisciplinarieslogsdetails/:date/:id' , (req, res, next) => {  disciplinaries.getdisciplinarieslogsdetails(req, res, next, connection) } );


  router.post('/adddisciplinary', (req,res) => { disciplinaries.adddisciplinary(req,res,db) } );


  router.put(`/updatedisciplinaries/:id`, (req, res, next) => { disciplinaries.updatedisciplinaries(req, res, next, db, connection) } );

  router.put(`/updatedisciplinarieslogs/:date/:id`, (req, res, next) => { disciplinaries.updatedisciplinarieslogs(req, res, next, db, connection) } );


  router.delete(`/terminatedisciplinarieslogs/:date/:id`, (req, res, next) => { disciplinaries.terminatedisciplinarieslogs(req, res, next, db, connection) } );

//*******************************************************************************





//*******************************************************************************
  router.get('/getlatestexternalsituations/:id' , (req, res, next) => { externalsituations.getlatestexternalsituations(req, res, next, connection) } );

  router.get('/getexternalsituationslogs/:id/:table' , (req, res, next) => { externalsituations.getexternalsituationslogs(req, res, next, connection) } );

  router.get('/getexternalsituationslogsdetails/:date/:id' , (req, res, next) => { externalsituations.getexternalsituationslogsdetails(req, res, next, connection) } );


  router.post('/addexternalsituations', (req,res) =>{ externalsituations.addexternalsituations(req,res,db) } );


  router.put(`/updateexternalsituations/:id`, (req, res, next) => { externalsituations.updateexternalsituations(req, res, next, db, connection) } );

  router.put(`/updateexternalsituationslogs/:date/:id`, (req, res, next) => { externalsituations.updateexternalsituationslogs(req, res, next, db, connection) } );


  router.delete(`/terminateexternalsituationslogs/:date/:id`, (req, res, next) => { externalsituations.terminateexternalsituationslogs(req, res, next, db, connection) } );

//*******************************************************************************






//*******************************************************************************
  router.get('/getlatestperformance/:id' , (req, res, next) => { performance.getlatestperformance(req, res, next, connection) } );

  router.get('/getperformancelogs/:id/:table' , (req, res, next) => { performance.getperformancelogs(req, res, next, connection) } );

  router.get('/getperformancelogsdetails/:date/:id' , (req, res, next) => { performance.getperformancelogsdetails(req, res, next, connection) } );

  router.get('/getperformancelogsdetailsID/:id' , (req, res, next) => { performance.getperformancelogsdetailsID(req, res, next, connection) } );

  router.get('/getperformancelogsdetailsIDpresentandpast/:id/:year' , (req, res, next) => { performance.getperformancelogsdetailsIDpresentandpast(req, res, next, connection) } );
  
  


  router.post('/addperformance', (req,res) =>{ performance.addperformance(req,res,db) } );


  router.put(`/updateperformance/:id`, (req, res, next) => { performance.updateperformance(req, res, next, db, connection) } );

  router.put(`/updateperformancelogs/:date/:id`, (req, res, next) => { performance.updateperformancelogs(req, res, next, db, connection) } );


  router.delete(`/terminateperformancelogs/:date/:id`, (req, res, next) => { performance.terminateperformancelogs(req, res, next, db, connection) } );

//*******************************************************************************






//*******************************************************************************
  router.get('/getlatesttraining/:id' , (req, res, next) => { training.getlatesttraining(req, res, next, connection) } );

  router.get('/gettraininglogs/:id/:table' , (req, res, next) => { training.gettraininglogs(req, res, next, connection) } );

  router.get('/gettraininglogsdetails/:date/:id' , (req, res, next) => { training.gettraininglogsdetails(req, res, next, connection) } );


  router.post('/addtraining', (req,res) =>{ training.addtraining(req,res,db) } );


  router.put(`/updatetraining/:id`, (req, res, next) => { training.updatetraining(req, res, next, db, connection) } );

  router.put(`/updatetraininglogs/:date/:id`, (req, res, next) => { training.updatetraininglogs(req, res, next, db, connection) } );


  router.delete(`/terminatetraininglogs/:date/:id`, (req, res, next) => { training.terminatetraininglogs(req, res, next, db, connection) } );

//*******************************************************************************





//*******************************************************************************
  router.post('/addworkleave', (req,res) =>{ });
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