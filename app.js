const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./crudapi.js');
const connection = require('./sequelize/dbconnection.js');

global.__basedir = __dirname;



connection
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


const app = express()
  .use(cors())
  .use(bodyParser.raw())
  .use(api(connection));


const port = process.env.PORT || 5000;

app.listen(port , () => console.log(`Server started on port : ${port}`) );