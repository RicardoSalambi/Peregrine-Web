const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./crudapi.js');
const connection = require('./sequelize/dbconnection.js');

global.__basedir = __dirname;




const app = express()
  .use(cors())
  //.use(bodyParser.urlencoded())
  .use(bodyParser.raw())
  .use(bodyParser.json())
  .use(api(connection));

const port = process.env.PORT || 5000;

app.listen(port , () => console.log(`Server started on port : ${port}`) );