const express = require('express');

const moment = require('moment-timezone');



var stream = require('stream');

const mysql = require('mysql2');

const dbconfig = require('./dbconfig');


const peregrineworkers = require('./crudoperations/peregrineworkersoperations');
const dependancies = require('./crudoperations/dependanciesoperations');
const disciplinaries = require('./crudoperations/disciplinariesoperations');
const externalsituations = require('./crudoperations/externalsituationsoperations');
const performance = require('./crudoperations/performanceoperations');
const training = require('./crudoperations/trainingoperations');

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

function createRouter(db) 
{
  const router = express.Router();
  const owner = '';



//*******************************************************************************
  router.get('/allmembers' , (req, res, next) => { peregrineworkers.allmembers(req, res, next) } );

  router.get('/getperegrineworkerslogs/:id/:table' , (req, res, next) => { peregrineworkers.getperegrineworkerslogs(req, res, next) } );

  router.get('/getperegrineworkerslogsdetails/:date/:id' , (req, res, next) => { peregrineworkers.getperegrineworkerslogsdetails(req, res, next) } );

  router.post('/addmemberdetails', (req,res, next) =>{ peregrineworkers.addmemberdetails(req,res, next, db) } );

  router.put(`/updateperegrineworkers/:id`, (req, res, next) => { peregrineworkers.updateperegrineworkers(req, res, next, db, connection)  } );

  router.put(`/updateperegrineworkerslogs/:date/:id`, (req, res, next) => { peregrineworkers.updateperegrineworkerslogs(req, res, next, db, connection) } );

//*******************************************************************************






//*******************************************************************************
router.get('/getdependancieslogs/:id/:table' , (req, res, next) => {  dependancies.getdependancieslogs(req, res, next, connection) } );

router.get('/getdependancieslogsdetails/:date/:id' , (req, res, next) => { dependancies.getdependancieslogsdetails(req, res, next, connection) } );

router.post('/adddependancies', (req,res) =>{ dependancies.adddependancies(req,res,db) } );

router.put(`/updatedependancies/:id`, (req, res, next) => { dependancies.updatedependancies(req, res, next, db, connection) } );

router.put(`/updatedependancieslogs/:date/:id`, (req, res, next) => { dependancies.updatedependancieslogs(req, res, next, db, connection) } );

//*******************************************************************************





//*******************************************************************************
router.get('/getdisciplinarieslogs/:id/:table' , (req, res, next) => { disciplinaries.getdisciplinarieslogs(req, res, next, connection) } );

router.get('/getdisciplinarieslogsdetails/:date/:id' , (req, res, next) => {  disciplinaries.getdisciplinarieslogsdetails(req, res, next, connection) } );

router.post('/adddisciplinary', (req,res) => { disciplinaries.adddisciplinary(req,res,db) } );

//*******************************************************************************





//*******************************************************************************
router.get('/getexternalsituationslogs/:id/:table' , (req, res, next) => { externalsituations.getexternalsituationslogs(req, res, next, connection) } );

router.get('/getexternalsituationslogsdetails/:date/:id' , (req, res, next) => { externalsituations.getexternalsituationslogsdetails(req, res, next, connection) } );

router.post('/addexternalsituations', (req,res) =>{ externalsituations.addexternalsituations(req,res,db) } );

//*******************************************************************************






//*******************************************************************************
router.get('/getperformancelogs/:id/:table' , (req, res, next) => { performance.getperformancelogs(req, res, next, connection) } );

router.get('/getperformancelogsdetails/:date/:id' , (req, res, next) => { performance.getperformancelogsdetails(req, res, next, connection) } );

router.post('/addperformance', (req,res) =>{ performance.addperformance(req,res,db) } );

//*******************************************************************************






//*******************************************************************************
router.get('/gettraininglogs/:id/:table' , (req, res, next) => { training.gettraininglogs(req, res, next, connection) } );

router.get('/gettraininglogsdetails/:date/:id' , (req, res, next) => { training.gettraininglogsdetails(req, res, next, connection) } );

router.post('/addtraining', (req,res) =>{ training.addtraining(req,res,db) } );

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