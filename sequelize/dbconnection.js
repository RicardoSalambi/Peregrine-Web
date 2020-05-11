const Sequelize = require('sequelize');
const mysql = require('mysql2');
const figlet = require('figlet');

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

const connection = new Sequelize('crudtest', 'root', 'NetlettiWorld@1', {

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


figlet('Peregrine', function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data)
});



connection
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


//***************************************************************************************************************************************

const peregrineworkersmodel = peregrineworkers(Sequelize, connection);
const peregrineworkerslogsmodel = peregrineworkerslogs(Sequelize, connection);

peregrineworkersmodel.hasMany(peregrineworkerslogsmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'NO ACTION', 
  onUpdate: 'CASCADE'
});
peregrineworkerslogsmodel.belongsTo(peregrineworkersmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

//***************************************************************************************************************************************



//***************************************************************************************************************************************

const dependanciesmodel = dependancies(Sequelize, connection);
const dependancieslogmodel = dependancieslog(Sequelize, connection);

dependanciesmodel.hasMany(dependancieslogmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'NO ACTION', 
  onUpdate: 'CASCADE'
});
dependancieslogmodel.belongsTo(dependanciesmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});


peregrineworkersmodel.hasMany(dependanciesmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'NO ACTION', 
  onUpdate: 'CASCADE'
});
dependanciesmodel.belongsTo(peregrineworkersmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

//***************************************************************************************************************************************



//***************************************************************************************************************************************

const disciplinariesmodel = disciplinaries(Sequelize, connection);
const disciplinarieslogsmodel = disciplinarieslogs(Sequelize, connection);

disciplinariesmodel.hasMany(disciplinarieslogsmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'NO ACTION', 
  onUpdate: 'CASCADE'
});
disciplinarieslogsmodel.belongsTo(disciplinariesmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

peregrineworkersmodel.hasMany(disciplinariesmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'NO ACTION', 
  onUpdate: 'CASCADE'
});
disciplinariesmodel.belongsTo(peregrineworkersmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

//***************************************************************************************************************************************


//***************************************************************************************************************************************

const externalsituationsmodel = externalsituations(Sequelize, connection);
const externalsituationslogsmodel = externalsituationslogs(Sequelize, connection);

externalsituationsmodel.hasMany(externalsituationslogsmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'NO ACTION', 
  onUpdate: 'CASCADE'
});
externalsituationslogsmodel.belongsTo(externalsituationsmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

peregrineworkersmodel.hasMany(externalsituationsmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'NO ACTION', 
  onUpdate: 'CASCADE'
});
externalsituationsmodel.belongsTo(peregrineworkersmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

//***************************************************************************************************************************************



//***************************************************************************************************************************************

const performancemodel = performance(Sequelize, connection);
const performancelogsmodel = performancelogs(Sequelize, connection);

performancemodel.hasMany(performancelogsmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'NO ACTION', 
  onUpdate: 'CASCADE'
});
performancelogsmodel.belongsTo(performancemodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

peregrineworkersmodel.hasMany(performancemodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'NO ACTION', 
  onUpdate: 'CASCADE'
});
performancemodel.belongsTo(peregrineworkersmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

//***************************************************************************************************************************************


//***************************************************************************************************************************************

const trainingmodel = training(Sequelize, connection);
const traininglogsmodel = traininglogs(Sequelize, connection);

trainingmodel.hasMany(traininglogsmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'NO ACTION', 
  onUpdate: 'CASCADE'
});
traininglogsmodel.belongsTo(trainingmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

peregrineworkersmodel.hasMany(trainingmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'NO ACTION', 
  onUpdate: 'CASCADE'
});
trainingmodel.belongsTo(peregrineworkersmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

//***************************************************************************************************************************************



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
