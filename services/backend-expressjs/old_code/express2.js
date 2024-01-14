const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'NetlettiWorld@1',
  database : 'testdb'
});

connection.connect();

const port = process.env.PORT || 5000;

const app = express()
  .use(cors())
  .use(bodyParser.raw())
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});