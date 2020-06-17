const Sequelize = require('sequelize');
const mysql = require('mysql2');
const figlet = require('figlet');

const dbconfig = require('../dbconfig');

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

const workleave = require('./models/workleave/workleave')
const workleavelogs = require('./models/workleave/workleavelogs')

const connection = new Sequelize(dbconfig.database, dbconfig.user, dbconfig.password, {

  host: dbconfig.host,
  dialect: 'mysql',
  timezone: '+02:00',
  define: {
    timestamps: false,
  },

  pool: {
    max: 15,
    min: 3,
    acquire: 30000,
    idle: 10000,
    // max_allowed_packet = 100000000,
    // net_buffer_length = 1000000 
  },

  dialectOptions: {
    timezone: "local",
    /*useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: function (field, next) { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
          return next()
        },*/
  }

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
  onDelete: 'CASCADE', 
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
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});
dependancieslogmodel.belongsTo(dependanciesmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});


peregrineworkersmodel.hasOne(dependanciesmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'CASCADE', 
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
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});
disciplinarieslogsmodel.belongsTo(disciplinariesmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

peregrineworkersmodel.hasMany(disciplinariesmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'CASCADE', 
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
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});
externalsituationslogsmodel.belongsTo(externalsituationsmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

peregrineworkersmodel.hasMany(externalsituationsmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'CASCADE', 
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
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});
performancelogsmodel.belongsTo(performancemodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

peregrineworkersmodel.hasMany(performancemodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'CASCADE', 
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
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});
traininglogsmodel.belongsTo(trainingmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

peregrineworkersmodel.hasMany(trainingmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});
trainingmodel.belongsTo(peregrineworkersmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

//***************************************************************************************************************************************


//***************************************************************************************************************************************

const workleavemodel = workleave(Sequelize, connection);
const workleavelogsmodel = workleavelogs(Sequelize, connection);

workleavemodel.hasMany(workleavelogsmodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});
workleavelogsmodel.belongsTo(workleavemodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

peregrineworkersmodel.hasMany(workleavemodel, {  
  foreignKey: {name:'worknumber'} , 
  sourceKey: 'worknumber',
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE'
});
workleavemodel.belongsTo(peregrineworkersmodel, {foreignKey: 'worknumber',targetKey: 'worknumber', constraints: false});

//***************************************************************************************************************************************





connection.sync() 
  .then(() => {
    console.log(`Database & tables created!`)
});


module.exports = {

  connection,

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

  workleavemodel,
  workleavelogsmodel,
  
}
