const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mysql = require('mysql2');
const dbconfig = require('./dbconfig');

const api = require('./crudapi.js');
const connection = require('./sequelize/dbconnection.js');

/////////////////////////////////////////////
const connection2 = mysql.createConnection({
  host : dbconfig.host,
  user : dbconfig.user,
  password : dbconfig.password,
  database : dbconfig.database,
  timezone : 'Z'
  //port: '3306'
});
/////////////////////////////////////////////

global.__basedir = __dirname;


const app = express()
  .use(cors())
  //.use(bodyParser.urlencoded())
  .use(bodyParser.raw())
  .use(bodyParser.json())
  .use(api(connection,connection2));

const port = process.env.PORT || 5000;

app.listen(port , () => console.log(`Server started on port : ${port}`) );