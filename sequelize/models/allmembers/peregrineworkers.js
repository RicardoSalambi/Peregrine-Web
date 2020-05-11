//const Sequelize = require('sequelize');
//const connection = require('../../dbconnection')

module.exports = (Sequelize,connection) =>  {


  return connection.define('peregrineworkers', {
    
    date  : {
      type  : Sequelize.DATE
    },
    worknumber  : {
      type  : Sequelize.INTEGER,
      primaryKey    : true
    },
    name  : {
      type  : Sequelize.TEXT
    },
    surname  : {
      type  : Sequelize.TEXT
    },
    qualification  : {
      type  : Sequelize.TEXT
    },
    department  : {
      type  : Sequelize.TEXT
    },
    skills  : {
      type  : Sequelize.TEXT
    },
    position  : {
      type  : Sequelize.TEXT
    },
    nationality  : {
      type  : Sequelize.TEXT
    },
    gender  : {
      type  : Sequelize.TEXT
    },
    house  : {
      type  : Sequelize.TEXT
    },
    address  : {
      type  : Sequelize.TEXT
    },
    comments  : {
      type  : Sequelize.TEXT
    },
    filename : {
      type  : Sequelize.TEXT
    },
    file    : {
      type  : Sequelize.BLOB('long')
    },
    imgfile : {
      type  : Sequelize.BLOB('long')
    },
    
    
    


  });
}