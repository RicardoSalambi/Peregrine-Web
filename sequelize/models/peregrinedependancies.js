const Sequelize = require('sequelize');
const connection = require('../dbconnection')

module.exports = connection.define('peregrinedependancies', {

    worknumber  : {
      type  : Sequelize.INTEGER,
      primaryKey    : true
    },
    next_of_kin  : {
        type  : Sequelize.TEXT
    },
    emergencycontact  : {
        type  : Sequelize.TEXT
    },
    file  : {
        type  : Sequelize.BLOB('long')
    }
    


  });