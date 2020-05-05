const Sequelize = require('sequelize');
const connection = require('../dbconnection')

module.exports = connection.define('peregrineworkers', {
    
    /*count  : {
      type  : Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    File  : {
      type  : Sequelize.BLOB('long')
    }*/
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
    documents  : {
      type  : Sequelize.BLOB('long')
    },
    filename : {
      type  : Sequelize.TEXT
    }
    


  });