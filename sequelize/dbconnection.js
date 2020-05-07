const Sequelize = require('sequelize');
const mysql = require('mysql2');

const peregrineworkers = require('./models/allmembers/peregrineworkers')
const peregrineworkerslogs = require('./models/allmembers/peregrineworkerslogs')
const dependancies = require('./models/dependancies/dependancies')
const dependancieslog = require('./models/dependancies/dependancieslog')

const disciplinaries = require('./models/disciplinary/disciplinaries')
const disciplinarieslogs = require('./models/disciplinary/disciplinarieslogs')

const externalsituations = require('./models/externalsituations/externalsituations')
const externalsituationslogs = require('./models/externalsituations/externalsituationslogs')

const performance = require('./models/performance/performance')
const performancelogs = require('./models/performance/performancelogs')

const training = require('./models/training/training')
const traininglogs = require('./models/training/traininglogs')

const connection = new Sequelize('onlineperegrinedb', 'root', 'NetlettiWorld@1', {

  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false,
    //max_allowed_packet : 100000000,
  },

  pool: {
    max: 15,
    min: 3,
    acquire: 30000,
    idle: 10000,
    // max_allowed_packet = 100000000,
    // net_buffer_length = 1000000 
  },

  /*dialectOptions: {
    options: {
      encrypt: true
    }
  }*/

});



connection
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});



const dependanciesmodel = dependancies(Sequelize, connection);
const dependancieslogmodel = dependancieslog(Sequelize, connection);

const peregrineworkersmodel = peregrineworkers(Sequelize, connection);
const peregrineworkerslogsmodel = peregrineworkerslogs(Sequelize, connection);

const disciplinariesmodel = disciplinaries(Sequelize, connection);
const disciplinarieslogsmodel = disciplinarieslogs(Sequelize, connection);

const externalsituationsmodel = externalsituations(Sequelize, connection);
const externalsituationslogsmodel = externalsituationslogs(Sequelize, connection);

const performancemodel = performance(Sequelize, connection);
const performancelogsmodel = performancelogs(Sequelize, connection);

const trainingmodel = training(Sequelize, connection);
const traininglogsmodel = traininglogs(Sequelize, connection);



connection.sync() 
  .then(() => {
    console.log(`Database & tables created!`)
});


module.exports = {

  dependanciesmodel,
  dependancieslogmodel,

  peregrineworkersmodel,  
  peregrineworkerslogsmodel,
  
  disciplinariesmodel,
  disciplinarieslogsmodel,

  externalsituationsmodel,
  externalsituationslogsmodel,

  performancemodel,
  performancelogsmodel,

  trainingmodel,
  traininglogsmodel,
  
}
