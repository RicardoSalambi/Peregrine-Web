const Sequelize = require('sequelize');
const connection = require('../../dbconnection')

module.exports = (Sequelize,connection) =>  {


    return connection.define('dependancies', {

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
        filename : {
            type  : Sequelize.TEXT
        },
        file  : {
            type  : Sequelize.BLOB('long')
        }   


  });
}