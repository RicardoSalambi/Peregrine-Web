const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  /*router.all("/post", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });*/

  router.post('/eventplace/:worknumber/:name/:surname/:qualification/:department/:skills/:position/:nationality/:gender/:house/:address/:comments', (req, res, next) => {      
    db.query(
      `INSERT INTO peregrineworkers (worknumber, name, surname,qualification,department,skills,position,nationality,gender,house,address,comments) VALUES (
          ${req.params.worknumber},
          '${req.params.name}',
          '${req.params.surname}',
          '${req.params.qualification}',
          '${req.params.department}',
          '${req.params.skills}',
          '${req.params.position}',
          '${req.params.nationality}',
          '${req.params.gender}',
          '${req.params.house}',
          '${req.params.address}',
          '${req.params.comments}')`,
      [123456789, 26.26, 62.62,'Ricardo','Salambi','null'],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/event', function (req, res, next) { ///:id/:id2
    db.query(
      `SELECT ais_message_source_id, latitude, longitude,name,nmeastring,JunkTest FROM test2;`, //where count = ${req.params.id2}
      [owner, 10*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });


  router.put('/event/:id', function (req, res, next) {
    db.query(
      'UPDATE events SET name=?, description=?, date=? WHERE id=? AND owner=?',
      [req.body.name, req.body.description, new Date(req.body.date), req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/event/:id', function (req, res, next) {
    db.query(
      'DELETE FROM events WHERE id=? AND owner=?',
      [req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;