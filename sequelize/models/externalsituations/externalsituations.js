module.exports = (Sequelize,connection) =>  {


    return connection.define('externalsituations', {

        worknumber  : {
            type  : Sequelize.INTEGER,
            primaryKey    : true
        },
        responsiblities  : {
            type  : Sequelize.TEXT
        },


  });
}